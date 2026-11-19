import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIRS = [
    Path("d:/AntiGravity/laserAI"),
    Path("d:/AntiGravity/laserAI/frontend/public"),
    Path(r"C:/Users/Navin/.gemini/antigravity/brain/77cac5b0-2b4c-4e50-b0de-dcf6a467f0d5")
]

def render_icon(size=1024):
    scale = 4
    dim = size * scale
    margin = int(dim * 0.06)
    rect = [margin, margin, dim - margin, dim - margin]
    radius = int(dim * 0.22)

    # 1. Gradient Background
    grad_img = Image.new('RGBA', (dim, dim), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(grad_img)
    for y in range(margin, dim - margin):
        t = (y - margin) / float(dim - 2 * margin)
        # Interpolate from #6366F1 (99, 102, 241) to #4338CA (67, 56, 202)
        r = int(99 * (1 - t) + 67 * t)
        g = int(102 * (1 - t) + 56 * t)
        b = int(241 * (1 - t) + 202 * t)
        grad_draw.line([(margin, y), (dim - margin, y)], fill=(r, g, b, 255), width=1)

    # Mask to rounded rectangle
    mask = Image.new('L', (dim, dim), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(rect, radius=radius, fill=255)
    icon_bg = Image.composite(grad_img, Image.new('RGBA', (dim, dim), (0, 0, 0, 0)), mask)

    # 2. Zap Lightning Bolt
    cx, cy = dim / 2.0, dim / 2.0
    bolt_span = dim * 0.54
    unit = bolt_span / 20.0

    bolt_raw = [(13, 2), (3, 14), (12, 14), (11, 22), (21, 10), (12, 10)]
    bolt_pts = [
        (cx + (px - 12.0) * unit, cy + (py - 12.0) * unit)
        for px, py in bolt_raw
    ]

    # Bolt soft drop shadow
    shadow_img = Image.new('RGBA', (dim, dim), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    shadow_pts = [(x, y + 10 * scale) for x, y in bolt_pts]
    s_draw.polygon(shadow_pts, fill=(20, 15, 60, 75))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=8 * scale))

    # Solid white bolt
    bolt_layer = Image.new('RGBA', (dim, dim), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bolt_layer)
    b_draw.polygon(bolt_pts, fill=(255, 255, 255, 255))

    # Composite
    comp = Image.alpha_composite(icon_bg, shadow_img)
    comp = Image.alpha_composite(comp, bolt_layer)

    return comp.resize((size, size), Image.Resampling.LANCZOS)

def render_full_horizontal_logo(width=1200, height=340, bg_color=None):
    scale = 3
    W = width * scale
    H = height * scale

    bg = (255, 255, 255, 255) if bg_color == 'white' else (0, 0, 0, 0)
    img = Image.new('RGBA', (W, H), bg)
    draw = ImageDraw.Draw(img)

    # Render Icon at left
    icon_size = int(H * 0.72)
    icon_margin_y = int((H - icon_size) / 2)
    icon_margin_x = int(H * 0.20)

    icon_raw = render_icon(size=icon_size)
    img.alpha_composite(icon_raw, (icon_margin_x, icon_margin_y))

    # Typography: "Laser AI"
    font_size_main = int(H * 0.38)
    font_path_main = r"C:\Windows\Fonts\segoeuib.ttf"
    font_main = ImageFont.truetype(font_path_main, font_size_main)

    text_x = icon_margin_x + icon_size + int(H * 0.14)
    text_y = int(H * 0.28)

    # Draw "Laser " in dark slate (#0F172A)
    draw.text((text_x, text_y), "Laser ", fill=(15, 23, 42, 255), font=font_main)
    laser_box = draw.textbbox((text_x, text_y), "Laser ", font=font_main)
    ai_x = laser_box[2]

    # Draw "AI" in brand indigo (#4F46E5)
    draw.text((ai_x, text_y), "AI", fill=(79, 70, 229, 255), font=font_main)
    ai_box = draw.textbbox((ai_x, text_y), "AI", font=font_main)

    # Subtitle / Pill: "CUSTOMER INTELLIGENCE ENGINE"
    pill_text = "CUSTOMER INTELLIGENCE"
    font_size_sub = int(H * 0.10)
    font_sub = ImageFont.truetype(font_path_main, font_size_sub)
    pill_x = text_x + int(H * 0.02)
    pill_y = int(H * 0.70)

    # Draw pill background
    p_box = draw.textbbox((pill_x, pill_y), pill_text, font=font_sub)
    pad_x, pad_y = int(H * 0.04), int(H * 0.015)
    pill_rect = [p_box[0] - pad_x, p_box[1] - pad_y, p_box[2] + pad_x, p_box[3] + pad_y]
    draw.rounded_rectangle(pill_rect, radius=int(H * 0.04), fill=(238, 242, 255, 255), outline=(199, 210, 254, 255), width=int(scale * 1.5))

    # Draw pill text
    draw.text((pill_x, pill_y), pill_text, fill=(67, 56, 202, 255), font=font_sub)

    return img.resize((width, height), Image.Resampling.LANCZOS)

def main():
    print("Generating high-resolution Laser AI PNG assets...")

    icon_512 = render_icon(512)
    icon_1024 = render_icon(1024)
    logo_trans = render_full_horizontal_logo(1200, 340, bg_color=None)
    logo_white = render_full_horizontal_logo(1200, 340, bg_color='white')

    assets = {
        "laser-ai-icon.png": icon_512,
        "laser-ai-icon-large.png": icon_1024,
        "laser-ai-logo.png": logo_trans,
        "laser-ai-logo-white-bg.png": logo_white,
    }

    for dir_path in OUTPUT_DIRS:
        dir_path.mkdir(parents=True, exist_ok=True)
        for name, img in assets.items():
            dest = dir_path / name
            img.save(str(dest), "PNG", optimize=True)
            print(f"Saved: {dest}")

    print("All Laser AI PNG assets generated successfully!")

if __name__ == '__main__':
    main()
