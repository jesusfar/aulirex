# Extrae las figuras de las preguntas dependientes de imagen de los prengunteros.
# Localiza cada pregunta en el PDF, delimita con la pregunta siguiente y recorta
# la unión de imágenes rasterizadas + dibujos vectoriales de ese rango vertical.
# Escribe PNGs a public/figures/ y un manifiesto por materia.
#
# Uso: python scripts/import/extract_figures.py <subject>

import fitz, os, json, re, hashlib, sys

ROOT = "D:/PROGRAMAS/aulirex"
SCR = "C:/Users/sofia/AppData/Local/Temp/aulirex-import"
PARSED = SCR + "/utf8"
OUT_IMG = ROOT + "/public/figures"
os.makedirs(OUT_IMG, exist_ok=True)

PDFS = {
    "biologia": ("EJERCITACION-BIOLOGIA.pdf", "bio.json"),
    "fisica": ("EJERCITACION-FISICA.pdf", "fis.json"),
    "quimica": ("EJERCITACION-QUIMICA.pdf", "qui.json"),
}

subject = sys.argv[1]
pdf_name, json_name = PDFS[subject]
doc = fitz.open(f"{ROOT}/reference/{pdf_name}")
questions = json.load(open(f"{PARSED}/{json_name}", encoding="utf-8"))

# Texto de cada página (para localizar en qué página está una pregunta).
page_text = [doc[p].get_text() for p in range(len(doc))]

def clean_needle(stem):
    # Substring distintivo, ascii-ish, para search_for.
    s = re.sub(r"\s+", " ", stem).strip()
    s = "".join(c for c in s if ord(c) < 0x2000)  # sin superíndices/símbolos raros
    return s[:55]

def locate(stem, first_opt=None):
    """Devuelve (pno, rect) de la pregunta, o None."""
    needle = clean_needle(stem)
    if len(needle) < 8:
        return None
    cand = [p for p in range(len(doc)) if needle[:30] in re.sub(r"\s+", " ", page_text[p])]
    for pno in cand:
        hits = doc[pno].search_for(needle[:40])
        if not hits:
            hits = doc[pno].search_for(needle[:25])
        if hits:
            # si hay varios (stem genérico), desambiguar con la 1ª opción
            if len(hits) > 1 and first_opt:
                oh = doc[pno].search_for(clean_needle(first_opt)[:25])
                if oh:
                    hits.sort(key=lambda r: abs(r.y0 - oh[0].y0))
            return pno, hits[0]
    return None

# Figuras decorativas (frases motivacionales, etc.) detectadas en la auditoría
# visual: no pertenecen a ninguna pregunta.
BLOCKLIST = {"qui-fig-cd9d0c0ff8"}

def figure_bbox(page, y_top, y_bottom):
    pw = page.rect.width
    boxes = []
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            # descartar marcas de agua / banners de ancho casi completo
            if r.width > 0.8 * pw:
                continue
            if r.y0 >= y_top - 6 and r.y1 <= y_bottom + 6 and r.width > 22 and r.height > 22:
                boxes.append(r)
    for d in page.get_drawings():
        r = d["rect"]
        # descartar reglas/marcos/marca de agua: muy anchos (finos o no)
        if r.width > 0.8 * pw:
            continue
        if r.y0 >= y_top - 6 and r.y1 <= y_bottom + 6 and r.width > 28 and r.height > 16:
            boxes.append(r)
    if not boxes:
        return None
    # recorte ceñido al cluster dominante: descartar cajas cuyo centro-x se aleje
    # mucho del grueso de las cajas (texto de opciones a un costado).
    cxs = sorted((b.x0 + b.x1) / 2 for b in boxes)
    med = cxs[len(cxs) // 2]
    core = [b for b in boxes if abs((b.x0 + b.x1) / 2 - med) < 0.42 * pw]
    if core:
        boxes = core
    return fitz.Rect(min(b.x0 for b in boxes), min(b.y0 for b in boxes),
                     max(b.x1 for b in boxes), max(b.y1 for b in boxes))

fig_qs = [q for q in questions if q.get("dependsOnFigure")]
manifest = []
stats = {"con_figura": 0, "sin_figura_falsopos": 0, "no_localizada": 0}

for i, q in enumerate(fig_qs):
    opt0 = q["options"][0]["text"] if q.get("options") else None
    loc = locate(q["stem"], opt0)
    if not loc:
        stats["no_localizada"] += 1
        manifest.append({"number": q["number"], "section": q["section"], "status": "no_localizada", "stem": q["stem"][:60]})
        continue
    pno, stem = loc
    page = doc[pno]
    # límite inferior: siguiente pregunta del preguntero en la misma página, si la hay
    y_bottom = page.rect.height
    # buscar la próxima pregunta (por número) en las cercanías
    idx = questions.index(q)
    for nq in questions[idx + 1: idx + 4]:
        nloc = locate(nq["stem"], nq["options"][0]["text"] if nq.get("options") else None)
        if nloc and nloc[0] == pno and nloc[1].y0 > stem.y1:
            y_bottom = nloc[1].y0
            break
    bbox = figure_bbox(page, stem.y1, y_bottom)
    fid = f"{subject[:3]}-fig-{hashlib.sha1(q['stem'].encode('utf-8')).hexdigest()[:10]}"
    if bbox and bbox.width > 40 and bbox.height > 30 and fid not in BLOCKLIST:
        pad = 6
        crop = fitz.Rect(bbox.x0 - pad, bbox.y0 - pad, bbox.x1 + pad, bbox.y1 + pad)
        pix = page.get_pixmap(dpi=150, clip=crop)
        pix.save(f"{OUT_IMG}/{fid}.png")
        stats["con_figura"] += 1
        manifest.append({"number": q["number"], "section": q["section"], "status": "con_figura",
                         "image": f"/figures/{fid}.png", "stemKey": q["stem"][:50],
                         "w": pix.width, "h": pix.height, "page": pno})
    else:
        stats["sin_figura_falsopos"] += 1
        manifest.append({"number": q["number"], "section": q["section"], "status": "sin_figura",
                         "stemKey": q["stem"][:50]})

json.dump(manifest, open(f"{ROOT}/scripts/import/manifests/{subject}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(subject, "->", stats, "  total figura-flag:", len(fig_qs))
doc.close()
