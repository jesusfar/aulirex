# Extrae las figuras de las preguntas dependientes de imagen para una FUENTE
# arbitraria (Cajal, HQ, ...). Generaliza extract_figures.py: recibe el PDF y el
# JSON parseado por parse-source.mjs, localiza cada pregunta con figura por su
# texto, recorta la region de imagen/vectores entre el enunciado y la pregunta
# siguiente, guarda PNGs en public/figures/ y escribe un manifiesto.
#
# Uso: python scripts/import/extract_figures_source.py <pdf> <parsed.json> <src> <manifest_out.json>

import fitz, os, json, re, hashlib, sys

ROOT = "D:/PROGRAMAS/aulirex"
OUT_IMG = ROOT + "/public/figures"
os.makedirs(OUT_IMG, exist_ok=True)

pdf_path, parsed_path, src, manifest_out = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
doc = fitz.open(pdf_path)
questions = json.load(open(parsed_path, encoding="utf-8"))
page_text = [re.sub(r"\s+", " ", doc[p].get_text()) for p in range(len(doc))]


def clean_needle(stem):
    s = re.sub(r"\s+", " ", stem or "").strip()
    s = "".join(c for c in s if ord(c) < 0x2000)  # sin superindices/simbolos raros
    return s[:55]


def locate(stem, first_opt=None):
    needle = clean_needle(stem)
    if len(needle) < 8:
        return None
    cand = [p for p in range(len(doc)) if needle[:30] in page_text[p]]
    for pno in cand:
        hits = doc[pno].search_for(needle[:40]) or doc[pno].search_for(needle[:25])
        if hits:
            if len(hits) > 1 and first_opt:
                oh = doc[pno].search_for(clean_needle(first_opt)[:25])
                if oh:
                    hits.sort(key=lambda r: abs(r.y0 - oh[0].y0))
            return pno, hits[0]
    return None


def figure_bbox(page, y_top, y_bottom):
    pw = page.rect.width
    boxes = []
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.width > 0.8 * pw:
                continue
            if r.y0 >= y_top - 6 and r.y1 <= y_bottom + 6 and r.width > 22 and r.height > 22:
                boxes.append(r)
    for d in page.get_drawings():
        r = d["rect"]
        if r.width > 0.8 * pw:
            continue
        if r.y0 >= y_top - 6 and r.y1 <= y_bottom + 6 and r.width > 28 and r.height > 16:
            boxes.append(r)
    if not boxes:
        return None
    cxs = sorted((b.x0 + b.x1) / 2 for b in boxes)
    med = cxs[len(cxs) // 2]
    core = [b for b in boxes if abs((b.x0 + b.x1) / 2 - med) < 0.42 * pw]
    if core:
        boxes = core
    return fitz.Rect(min(b.x0 for b in boxes), min(b.y0 for b in boxes),
                     max(b.x1 for b in boxes), max(b.y1 for b in boxes))


fig_qs = [q for q in questions if q.get("dependsOnFigure")]
manifest = []
stats = {"con_figura": 0, "sin_figura": 0, "no_localizada": 0}

for q in fig_qs:
    opt0 = q["options"][0]["text"] if q.get("options") else None
    loc = locate(q["stem"], opt0)
    if not loc:
        stats["no_localizada"] += 1
        manifest.append({"number": q["number"], "subject": q.get("subject"), "status": "no_localizada", "stemKey": (q["stem"] or "")[:50]})
        continue
    pno, stem = loc
    page = doc[pno]
    y_bottom = page.rect.height
    idx = questions.index(q)
    for nq in questions[idx + 1: idx + 4]:
        nloc = locate(nq["stem"], nq["options"][0]["text"] if nq.get("options") else None)
        if nloc and nloc[0] == pno and nloc[1].y0 > stem.y1:
            y_bottom = nloc[1].y0
            break
    bbox = figure_bbox(page, stem.y1, y_bottom)
    subj3 = (q.get("subject") or "xxx")[:3]
    fid = f"{subj3}-{src}fig-{hashlib.sha1((q['stem'] or '').encode('utf-8')).hexdigest()[:10]}"
    if bbox and bbox.width > 40 and bbox.height > 30:
        pad = 6
        crop = fitz.Rect(bbox.x0 - pad, bbox.y0 - pad, bbox.x1 + pad, bbox.y1 + pad)
        pix = page.get_pixmap(dpi=150, clip=crop)
        pix.save(f"{OUT_IMG}/{fid}.png")
        stats["con_figura"] += 1
        manifest.append({"number": q["number"], "subject": q.get("subject"), "status": "con_figura",
                         "image": f"/figures/{fid}.png", "stemKey": (q["stem"] or "")[:50],
                         "w": pix.width, "h": pix.height, "page": pno})
    else:
        stats["sin_figura"] += 1
        manifest.append({"number": q["number"], "subject": q.get("subject"), "status": "sin_figura", "stemKey": (q["stem"] or "")[:50]})

json.dump(manifest, open(manifest_out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(src, "->", stats, "  total figura-flag:", len(fig_qs))
doc.close()
