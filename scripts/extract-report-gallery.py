"""Inspect report figures locally; export only explicitly selected, reviewed images.

python scripts/extract-report-gallery.py path/to/report.pdf
python scripts/extract-report-gallery.py path/to/report.pdf --export 78:session-dashboard 81:bridge-install
"""
import argparse
from pathlib import Path
import pymupdf
from PIL import Image, ImageDraw

parser = argparse.ArgumentParser()
parser.add_argument("report")
parser.add_argument("--export", nargs="*")
parser.add_argument("--review", action="store_true", help="Extract candidates into ignored scratch, not public assets")
parser.add_argument("--crop-top", type=int, default=0, help="Remove reviewed browser chrome in source pixels")
args = parser.parse_args()
document = pymupdf.open(args.report)
scratch = Path("tmp/pdfs")
scratch.mkdir(parents=True, exist_ok=True)
if args.export:
    output = scratch if args.review else Path("public/images/dmit")
    output.mkdir(parents=True, exist_ok=True)
    for item in args.export:
        page_number, slug = item.split(":")
        if not slug.replace("-", "").isalnum():
            raise ValueError("Invalid asset slug")
        page = document[int(page_number) - 1]
        candidates = page.get_images(full=True)
        source = max(candidates, key=lambda image: image[2] * image[3])
        pixmap = pymupdf.Pixmap(document, source[0])
        if pixmap.n > 3:
            pixmap = pymupdf.Pixmap(pymupdf.csRGB, pixmap)
        image = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)
        if args.crop_top:
            image = image.crop((0, args.crop_top, image.width, image.height))
        image.save(output / f"{slug}.webp", "WEBP", quality=90)
        print(slug, image.size, "source page", page_number)
else:
    sheet = Image.new("RGB", (1500, 2160), "#dbe1ec")
    draw = ImageDraw.Draw(sheet)
    for cell, number in enumerate(range(78, 87)):
        page = document[number - 1]
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False)
        image = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)
        image.save(scratch / f"report-page-{number}.png")
        image.thumbnail((480, 670))
        x, y = (cell % 3) * 500, (cell // 3) * 720
        sheet.paste(image, (x + 10, y + 32))
        draw.text((x + 12, y + 8), f"PDF page {number}", fill="#111827")
    sheet.save(scratch / "report-gallery-review.jpg", quality=90)
