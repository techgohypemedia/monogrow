from PIL import Image

bg = Image.open('public/assets/about-banner-rice.jpg')
# Let's crop around the sack (0 to 900, 100 to 768)
sack_region = bg.crop((0, 100, 900, 768))
sack_region.save('scratch/sack_region.jpg')
print('Sack region saved')
