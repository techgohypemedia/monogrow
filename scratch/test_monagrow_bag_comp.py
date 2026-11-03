import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

bg = Image.open('public/assets/about-banner-rice.jpg').convert('RGBA')
bag = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')

bw, bh = bg.size
# In about-banner-rice.jpg, let's see the rice mound mask in the foreground
# The rice grains in the foreground are roughly x > 480 or y > 450
# Let's extract the foreground grains so they can overlay in front of the bag base!

# Test Option 1: Monagrow bag tilted -32 degrees, lying where the sack was
bag_tilted = bag.rotate(-32, resample=Image.Resampling.BICUBIC, expand=True)

# Scale bag to fit the sack footprint
# Sack width is about 550px, height about 420px
scale = 0.58
new_w = int(bag_tilted.width * scale)
new_h = int(bag_tilted.height * scale)
bag_tilted_scaled = bag_tilted.resize((new_w, new_h), Image.Resampling.LANCZOS)

comp1 = bg.copy()
# Paste bag at (180, 180)
# Create a shadow
shadow = Image.new('RGBA', comp1.size, (0, 0, 0, 0))
# Paste shadow slightly offset and blurred
comp1.paste(bag_tilted_scaled, (170, 180), bag_tilted_scaled)
comp1.convert('RGB').save('scratch/test_bag_comp1.jpg', quality=95)

# Test Option 2: Monagrow bag slightly tilted (-10 deg), resting proudly on the rustic stone floor
# with the spilled grains flowing out in front of it
bag_tilt10 = bag.rotate(-12, resample=Image.Resampling.BICUBIC, expand=True)
scale2 = 0.55
new_w2 = int(bag_tilt10.width * scale2)
new_h2 = int(bag_tilt10.height * scale2)
bag_tilt10_scaled = bag_tilt10.resize((new_w2, new_h2), Image.Resampling.LANCZOS)

comp2 = bg.copy()
comp2.paste(bag_tilt10_scaled, (220, 150), bag_tilt10_scaled)
comp2.convert('RGB').save('scratch/test_bag_comp2.jpg', quality=95)

print("Composites saved: test_bag_comp1.jpg, test_bag_comp2.jpg")
