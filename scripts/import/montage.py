# Hoja de contactos de las figuras USADAS en el banco, con su índice, para auditar.
import json, os, math
from PIL import Image, ImageDraw, ImageFont

ROOT = "D:/PROGRAMAS/aulirex"
SCR = "C:/Users/sofia/AppData/Local/Temp/aulirex-import"
used = json.load(open(f"{SCR}/used_figs.json", encoding="utf-8"))

CELL = 300
COLS = 5
rows = math.ceil(len(used) / COLS)
pad = 26
sheet = Image.new("RGB", (COLS * CELL, rows * CELL), (30, 30, 40))
draw = ImageDraw.Draw(sheet)

for idx, name in enumerate(used):
    p = f"{ROOT}/public/figures/{name}"
    r, c = divmod(idx, COLS)
    x0, y0 = c * CELL, r * CELL
    try:
        im = Image.open(p).convert("RGB")
        im.thumbnail((CELL - 12, CELL - pad - 8))
        sheet.paste(im, (x0 + 6, y0 + pad))
    except Exception as e:
        draw.text((x0 + 6, y0 + pad), f"ERR {e}", fill=(255, 100, 100))
    draw.rectangle([x0, y0, x0 + CELL - 1, y0 + CELL - 1], outline=(90, 90, 110))
    draw.text((x0 + 6, y0 + 6), f"#{idx}  {name[:18]}", fill=(180, 220, 255))

out = f"{SCR}/montage_figs.png"
sheet.save(out)
print("montaje:", out, sheet.size, "  total:", len(used))
