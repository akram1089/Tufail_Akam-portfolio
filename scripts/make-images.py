"""
Generates the static image assets in public/ (Phase 2.6, 4.5).

    python scripts/make-images.py     # or: npm run images

Outputs:
    public/tufail-avatar.jpg      512x512  circular hero portrait (square source)
    public/tufail-avatar.webp     512x512
    public/tufail-avatar-256.webp 256x256  phone-sized variant
    public/og.png                 1200x630 social card, charcoal + amber
    public/apple-touch-icon.png   180x180
    public/favicon.svg            written by hand, kept in sync with these colours

Re-run after swapping in a new headshot.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCE_PHOTO = ROOT / "src" / "assets" / "me.jpeg"

# Matches the tokens in src/index.css: charcoal and one amber, no gradients.
PAGE = (18, 17, 16)
CARD = (26, 25, 23)
INK = (237, 234, 228)
MUTED = (163, 158, 148)
ACCENT = (224, 160, 60)

FONTS = Path("C:/Windows/Fonts")
SANS_BOLD = FONTS / "segoeuib.ttf"
SANS = FONTS / "segoeui.ttf"
SANS_LIGHT = FONTS / "segoeuisl.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def square_avatar() -> Image.Image:
    """Top-anchored square crop so the face is centred in the circular frame."""
    src = Image.open(SOURCE_PHOTO).convert("RGB")
    width, height = src.size  # 1024 x 1536
    top = 90  # a little headroom above the hair
    top = min(top, height - width)
    return src.crop((0, top, width, top + width)).resize((512, 512), Image.LANCZOS)


def write_avatar(avatar: Image.Image) -> None:
    avatar.save(PUBLIC / "tufail-avatar.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    avatar.save(PUBLIC / "tufail-avatar.webp", "WEBP", quality=82, method=6)
    avatar.resize((256, 256), Image.LANCZOS).save(
        PUBLIC / "tufail-avatar-256.webp", "WEBP", quality=80, method=6
    )


def background(size: tuple[int, int]) -> Image.Image:
    """Flat charcoal with one faint warm wash off the top-right, as on the site."""
    width, height = size
    card = Image.new("RGB", (width, height), PAGE)

    wash = Image.new("L", (width, height), 0)
    ImageDraw.Draw(wash).ellipse(
        [width * 0.44, -height * 0.6, width * 1.2, height * 0.8], fill=34
    )
    wash = wash.filter(ImageFilter.GaussianBlur(130))
    card.paste(Image.new("RGB", (width, height), ACCENT), (0, 0), wash)
    return card


def write_og(avatar: Image.Image) -> None:
    W, H = 1200, 630
    card = background((W, H))
    draw = ImageDraw.Draw(card)

    # Constellation hint — warm dust, the same as the canvas field.
    dots = [
        (90, 500), (170, 560), (260, 470), (1010, 120), (1080, 200),
        (960, 250), (1130, 470), (1050, 540), (620, 70), (700, 120),
    ]
    dust = (110, 104, 94)
    for i, (x, y) in enumerate(dots):
        draw.ellipse([x - 2, y - 2, x + 2, y + 2], fill=dust)
        # Only link neighbours — a line across the whole card reads as a scratch.
        if i and abs(dots[i - 1][0] - x) < 200 and abs(dots[i - 1][1] - y) < 200:
            draw.line([dots[i - 1], (x, y)], fill=(70, 66, 60), width=1)

    # Circular portrait on the right.
    d = 300
    cx, cy = W - 210, H // 2
    ring = Image.new("L", (d + 20, d + 20), 0)
    ImageDraw.Draw(ring).ellipse([0, 0, d + 19, d + 19], fill=90)
    card.paste(Image.new("RGB", (d + 20, d + 20), ACCENT), (cx - d // 2 - 10, cy - d // 2 - 10), ring)

    mask = Image.new("L", (d, d), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, d - 1, d - 1], fill=255)
    card.paste(avatar.resize((d, d), Image.LANCZOS), (cx - d // 2, cy - d // 2), mask)

    x = 78
    draw.text((x, 150), "Tufail Akram", font=font(SANS_BOLD, 88), fill=INK)
    name_w = draw.textlength("Tufail Akram", font=font(SANS_BOLD, 88))
    draw.text((x + name_w, 150), ".", font=font(SANS_BOLD, 88), fill=ACCENT)
    draw.text((x, 268), "Backend & AI Engineer", font=font(SANS, 42), fill=MUTED)
    draw.text(
        (x, 348),
        "Python · FastAPI · Django · Snowflake · AWS",
        font=font(SANS_LIGHT, 27),
        fill=MUTED,
    )
    draw.text((x, 392), "LLM & RAG pipelines · Hyderabad, India", font=font(SANS_LIGHT, 27), fill=MUTED)

    draw.rectangle([x, 470, x + 3, 524], fill=ACCENT)
    draw.text((x + 22, 484), "tufailakram-portfolio.netlify.app", font=font(SANS, 24), fill=ACCENT)

    card.save(PUBLIC / "og.png", "PNG", optimize=True)


def write_icon() -> None:
    """Solid amber tile with charcoal initials — legible at 16 px in a tab strip."""
    size = 180
    icon = Image.new("RGB", (size, size), ACCENT)
    draw = ImageDraw.Draw(icon)
    initials = font(SANS_BOLD, 94)
    box = draw.textbbox((0, 0), "TA", font=initials)
    draw.text(
        ((size - (box[2] - box[0])) / 2 - box[0], (size - (box[3] - box[1])) / 2 - box[1]),
        "TA",
        font=initials,
        fill=PAGE,
    )
    icon.save(PUBLIC / "apple-touch-icon.png", "PNG", optimize=True)


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    avatar = square_avatar()
    write_avatar(avatar)
    write_og(avatar)
    write_icon()
    for name in (
        "tufail-avatar.jpg",
        "tufail-avatar.webp",
        "tufail-avatar-256.webp",
        "og.png",
        "apple-touch-icon.png",
    ):
        kb = (PUBLIC / name).stat().st_size / 1024
        print(f"  {name:<26} {kb:7.1f} kB")


if __name__ == "__main__":
    main()
