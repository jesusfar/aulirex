#!/usr/bin/env python3
"""OCR de un PDF escaneado -> .txt "estilo pdftotext -layout".

Rasteriza cada pagina con pdftoppm (300 dpi) y la pasa por Tesseract en espanol.
Emite texto plano que consumen parse-source.mjs / parse-ejercitacion.mjs, de modo
que el resto del pipeline no cambia para PDF escaneados.

Requisitos: poppler (pdftoppm) y tesseract con idioma 'spa' en el PATH.

Uso: python scripts/import/ocr-pdf.py <entrada.pdf> <salida.txt> [--dpi 300] [--first N] [--last M] [--psm 6]
"""
import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def find_exe(*names):
    for n in names:
        p = shutil.which(n)
        if p:
            return p
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("out")
    ap.add_argument("--dpi", type=int, default=300)
    ap.add_argument("--first", type=int, default=None, help="primera pagina (1-based)")
    ap.add_argument("--last", type=int, default=None, help="ultima pagina")
    ap.add_argument("--psm", type=int, default=6, help="page segmentation mode de tesseract")
    ap.add_argument("--lang", default="spa")
    args = ap.parse_args()

    pdftoppm = find_exe("pdftoppm")
    tesseract = find_exe("tesseract")
    if not pdftoppm:
        sys.exit("ERROR: falta pdftoppm (poppler) en el PATH")
    if not tesseract:
        sys.exit("ERROR: falta tesseract en el PATH. Instala Tesseract OCR + idioma 'spa'.")

    pdf = Path(args.pdf)
    if not pdf.exists():
        sys.exit(f"ERROR: no existe {pdf}")

    with tempfile.TemporaryDirectory() as td:
        tdp = Path(td)
        # 1) Rasterizar a PNG.
        cmd = [pdftoppm, "-png", "-r", str(args.dpi)]
        if args.first:
            cmd += ["-f", str(args.first)]
        if args.last:
            cmd += ["-l", str(args.last)]
        cmd += [str(pdf), str(tdp / "page")]
        subprocess.run(cmd, check=True)

        pages = sorted(tdp.glob("page*.png"))
        if not pages:
            sys.exit("ERROR: pdftoppm no produjo imagenes")

        # 2) OCR pagina por pagina, concatenando con salto de pagina (\f) como pdftotext.
        chunks = []
        for i, png in enumerate(pages, 1):
            res = subprocess.run(
                [tesseract, str(png), "stdout", "-l", args.lang, "--psm", str(args.psm), "--dpi", str(args.dpi)],
                capture_output=True, text=True, encoding="utf-8", errors="replace",
            )
            if res.returncode != 0:
                print(f"  aviso: tesseract fallo en {png.name}: {res.stderr[:120]}", file=sys.stderr)
            chunks.append(res.stdout)
            print(f"  OCR pagina {i}/{len(pages)}", file=sys.stderr)

        text = "\f".join(chunks)
        Path(args.out).write_text(text, encoding="utf-8")

    dense = len("".join(text.split()))
    print(f"OK: {len(pages)} paginas -> {args.out} ({dense} caracteres, ~{dense // max(len(pages),1)}/pag)")


if __name__ == "__main__":
    main()
