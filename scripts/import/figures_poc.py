# POC v2: recortar la figura (unión de imágenes + dibujos bajo el enunciado).
import fitz, os

PDF = "D:/PROGRAMAS/aulirex/reference/EJERCITACION-BIOLOGIA.pdf"
OUT = "C:/Users/sofia/AppData/Local/Temp/aulirex-import/figs"
os.makedirs(OUT, exist_ok=True)

def figure_bbox(page, y_top, y_bottom):
    """Unión de rects de imágenes y dibujos sustanciales en [y_top, y_bottom]."""
    boxes = []
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.y0 >= y_top - 5 and r.y1 <= y_bottom + 5 and r.width > 20 and r.height > 20:
                boxes.append(r)
    for d in page.get_drawings():
        r = d["rect"]
        if r.y0 >= y_top - 5 and r.y1 <= y_bottom + 5 and r.width > 25 and r.height > 15:
            boxes.append(r)
    if not boxes:
        return None
    x0 = min(b.x0 for b in boxes); y0 = min(b.y0 for b in boxes)
    x1 = max(b.x1 for b in boxes); y1 = max(b.y1 for b in boxes)
    return fitz.Rect(x0, y0, x1, y1)

doc = fitz.open(PDF)
needle = "Mire el siguiente esquema"
for pno in range(len(doc)):
    page = doc[pno]
    hits = page.search_for(needle)
    if not hits:
        continue
    stem = hits[0]
    # límite inferior: primera aparición de "Observamos un polímero" (las afirmaciones)
    nxt = page.search_for("Observamos un pol")
    y_bottom = nxt[0].y0 if nxt else page.rect.height
    bbox = figure_bbox(page, stem.y1, y_bottom)
    print("stem.y1=%.0f  y_bottom=%.0f  bbox=%s" % (stem.y1, y_bottom, bbox))
    if bbox:
        pad = 6
        crop = fitz.Rect(bbox.x0 - pad, bbox.y0 - pad, bbox.x1 + pad, bbox.y1 + pad)
        pix = page.get_pixmap(dpi=150, clip=crop)
        out = os.path.join(OUT, "bio_q33_fig.png")
        pix.save(out)
        print("figura recortada:", out, "  %dx%d px" % (pix.width, pix.height))
    break
doc.close()
