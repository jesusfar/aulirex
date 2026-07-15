# Extrae TÍTULOS/UNIDADES de los temarios (no preguntas) para enriquecer la
# taxonomía de clasificación. Detecta encabezados por tamaño de fuente (mayor que
# el cuerpo) y por marcadores (UNIDAD/TEMA/CLASE/CAPÍTULO/BOLILLA). No modifica el
# banco: escribe una referencia por materia.
#
# Uso: python scripts/import/extract-topics.py

import fitz, re, json, os
from collections import Counter

ROOT = "D:/PROGRAMAS/aulirex"
BASE = "D:/PDF MEDICINA"

# Temarios de TEXTO (extraíbles) por materia. Los escaneados-manuscritos se omiten.
TEMARIOS = {
    "quimica": [f"{BASE}/Teorias/todas las teoricas quimica.pdf"],
    "fisica": [f"{BASE}/Teorias/Todas las teorias fisica.pdf"],
    "biologia": [f"{BASE}/Cajal/CUADERNILLO BIOLOGIA 2018 - 2019.pdf"],
    "comprension_textos": [f"{BASE}/Teorias/todas las teoricas alfabetizacion.pdf"],
}

MARKER = re.compile(r"^\s*(UNIDAD|TEMA|CLASE|CAP[IÍ]TULO|BOLILLA|M[OÓ]DULO|EJE)\b", re.I)
NOISE = re.compile(r"p[aá]gina|www|http|@|^\d+$|derechos|prohibida|^[\W_]+$", re.I)
# Fragmentos que NO son títulos: fórmulas, ecuaciones, unidades sueltas.
FORMULA = re.compile(r"[=+×÷…±≈]|\bKg\b|\bPa\b|\bcc\b|\bN\b|[₀-₉⁰-⁹]|\d.*\d")


def is_topic_like(t):
    if FORMULA.search(t):
        return False
    letters = sum(c.isalpha() for c in t)
    if letters < max(4, 0.6 * len(t)):  # mayormente alfabético
        return False
    return True


def headings_from(path):
    doc = fitz.open(path)
    sizes = Counter()
    spans = []
    for p in range(len(doc)):
        for b in doc[p].get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                txt = "".join(s["text"] for s in l["spans"]).strip()
                if not txt:
                    continue
                sz = round(max((s["size"] for s in l["spans"]), default=0), 1)
                bold = any((s["flags"] & 2 ** 4) or "bold" in s["font"].lower() for s in l["spans"])
                sizes[sz] += len(txt)
                spans.append((txt, sz, bold))
    doc.close()
    if not sizes:
        return []
    body = sizes.most_common(1)[0][0]  # tamaño de cuerpo = el más frecuente
    out = []
    for txt, sz, bold in spans:
        t = re.sub(r"\s+", " ", txt).strip(" .:-–")
        if len(t) < 4 or len(t) > 70 or NOISE.search(t):
            continue
        is_heading = MARKER.search(t) or sz >= body * 1.18 or (bold and sz >= body * 1.05 and len(t) <= 55)
        # evitar oraciones (pocas palabras) y fórmulas/fragmentos.
        words = t.split()
        if is_heading and (MARKER.search(t) or len(words) <= 8) and is_topic_like(t):
            out.append(t)
    # dedup preservando orden
    seen, uniq = set(), []
    for t in out:
        k = t.lower()
        if k not in seen:
            seen.add(k)
            uniq.append(t)
    return uniq


result = {}
for subject, paths in TEMARIOS.items():
    topics = []
    for p in paths:
        if os.path.exists(p):
            topics += headings_from(p)
    # dedup global por materia
    seen, uniq = set(), []
    for t in topics:
        k = t.lower()
        if k not in seen:
            seen.add(k)
            uniq.append(t)
    result[subject] = uniq
    print(f"{subject}: {len(uniq)} títulos candidatos")

out_path = f"{ROOT}/scripts/import/manifests/temario-topics.json"
json.dump(result, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Escrito:", out_path)
