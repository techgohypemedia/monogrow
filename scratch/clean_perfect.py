import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

def perfect_clean():
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    arr = np.array(orig).astype(np.float32)
    h, w, _ = arr.shape
    
    cleaned = arr.copy()
    
    # 1. Clean the top-right opening of the burlap sack: x in 530..630, y in 260..430
    # On the right (x: 630..730, y: 260..430) is the dark wall and shelf shadow.
    # We extend this leftwards with smooth alpha feathering.
    src_right = arr[260:430, 630:730] # 170x100
    for dy in range(170):
        y = 260 + dy
        for dx in range(100):
            x = 630 - dx # moving left from 630 down to 530
            # Weight decreases as we move further left
            weight = np.clip((80 - dx) / 80.0, 0, 1)
            # Sample from the right
            sample = src_right[dy, min(dx, 99)]
            # If the pixel is burlap (warm brown), replace it
            r, g, b = cleaned[y, x]
            if (r > 80 and g > 55 and b < 100 and r - b > 15) or (x > 570 and y < 400):
                cleaned[y, x] = cleaned[y, x] * (1 - weight) + sample * weight

    # 2. Clean the left side tail of burlap: x in 90..260, y in 220..660
    # Left wall source: x in 20..90, y in 220..400
    src_wall = arr[220:400, 20:90] # 180x70
    # Left table source: x in 20..90, y in 400..660
    src_table = arr[400:660, 20:90] # 260x70
    
    # Horizontal smooth fill with subtle texture jitter to prevent banding
    np.random.seed(42)
    for y in range(220, 400):
        for x in range(90, 260):
            # check if burlap
            r, g, b = cleaned[y, x]
            if r > 60 and g > 45 and b < 100 and r - b > 10:
                sx = (x - 90) % 70
                # sample from wall
                cleaned[y, x] = src_wall[y - 220, sx] + np.random.normal(0, 2, 3)
                
    for y in range(400, 660):
        for x in range(90, 260):
            r, g, b = cleaned[y, x]
            if r > 70 and g > 55 and b < 120 and r - b > 12:
                sx = (x - 90) % 70
                cleaned[y, x] = src_table[y - 400, sx] + np.random.normal(0, 3, 3)
                
    # Apply subtle local gaussian smoothing across the transition boundary at x=90..110
    trans_mask = np.zeros((h, w), dtype=bool)
    trans_mask[220:660, 85:120] = True
    blurred = gaussian_filter(cleaned, sigma=[1.5, 1.5, 0])
    cleaned[trans_mask] = blurred[trans_mask]
    
    res = Image.fromarray(np.clip(cleaned, 0, 255).astype(np.uint8))
    res.save('scratch/bg_perfect_clean.jpg')
    print('Cleaned background saved.')

perfect_clean()
