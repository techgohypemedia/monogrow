import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter

def clean_background():
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    arr = np.array(orig).astype(np.float32)
    h, w, _ = arr.shape
    
    # Let's inspect the burlap mask precisely:
    # Burlap sack has color: R in 100..210, G in 75..170, B in 40..120, R - B > 35
    # Let's create an exact mask of the burlap sack
    is_burlap = (
        (arr[:, :, 0] > 90) & (arr[:, :, 0] < 220) &
        (arr[:, :, 1] > 65) & (arr[:, :, 1] < 180) &
        (arr[:, :, 2] < 125) &
        (arr[:, :, 0] - arr[:, :, 2] > 25)
    )
    # Sack is bounded: x in 80..630, y in 220..660
    burlap_mask = np.zeros((h, w), dtype=bool)
    burlap_mask[220:660, 80:630] = is_burlap[220:660, 80:630]
    
    # Exclude rice pixels from sack mask (rice is bright: R>180, G>170, B>150)
    is_rice = (arr[:, :, 0] > 175) & (arr[:, :, 1] > 165) & (arr[:, :, 2] > 140)
    burlap_mask = burlap_mask & (~is_rice)
    
    # Dilate mask slightly so edges of burlap are fully covered
    burlap_mask = gaussian_filter(burlap_mask.astype(float), sigma=3) > 0.1
    
    # We will reconstruct:
    # 1. Top burlap part (y: 220..400) -> Stone wall
    # 2. Bottom burlap part (y: 400..660) -> Slate table
    
    cleaned = arr.copy()
    
    # For the wall (y: 220..400, x: 80..630):
    # The wall is naturally dark with subtle stone noise.
    # We can blend the dark background from the right (x: 630..800, y: 220..400)
    # and left wall (x: 20..100, y: 220..400).
    wall_left = arr[220:400, 20:100] # shape (180, 80, 3)
    wall_right = arr[220:400, 630:730] # shape (180, 100, 3)
    
    # For table (y: 400..660, x: 80..630):
    table_left = arr[400:660, 20:100] # shape (260, 80, 3)
    
    # Let's save the mask so we can inspect it
    mask_img = Image.fromarray((burlap_mask * 255).astype(np.uint8))
    mask_img.save('scratch/burlap_mask.png')
    print('Burlap mask saved, count =', np.sum(burlap_mask))

clean_background()
