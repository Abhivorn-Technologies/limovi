import sys
from PIL import Image
import os

img_path = 'public/ecosystem.png'
out_dir = 'public/images'

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

try:
    img = Image.open(img_path)
    width, height = img.size

    cols = 4
    rows = 3
    w = width // cols
    h = height // rows

    idx = 1
    for r in range(rows):
        for c in range(cols):
            left = c * w
            top = r * h
            right = left + w
            bottom = top + h
            cropped = img.crop((left, top, right, bottom))
            cropped.save(f'{out_dir}/journey-{idx}.png')
            idx += 1
    print("Successfully cropped 12 images!")
except Exception as e:
    print(f"Error: {e}")
