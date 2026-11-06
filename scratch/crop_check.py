from PIL import Image

im = Image.open("scratch/test_blue_exact_text.png")
# Crop the entire lower half from Y=450 to 950
im.crop((100, 450, 750, 950)).save("scratch/test_blue_lower_half.png")
print("Saved scratch/test_blue_lower_half.png")

