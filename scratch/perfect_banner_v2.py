import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter

def build_perfect_v2():
    print('1. Loading assets...')
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    orig_arr = np.array(orig).astype(np.float32)
    h, w, _ = orig_arr.shape # 768, 1376
    
    clean_bg = orig_arr.copy()
    
    # Bag geometry
    bag_raw = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')
    target_h = 660
    target_w = int(bag_raw.width * (target_h / bag_raw.height)) # 426
    bag_scaled = bag_raw.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = 220
    pos_y = 65
    
    # 2. Clean the right burlap opening (x in 450..710, y in 240..530)
    # Background source: dark stone wall and shelf shadow from x in 715..835, y in 240..530
    shelf_src = orig_arr[240:530, 715:835] # shape (290, 120, 3)
    
    for y in range(240, 530):
        for x in range(450, 710):
            r, g, b = clean_bg[y, x]
            # Rice grains are bright: r > 175, g > 165, b > 135. DO NOT touch rice!
            is_rice = (r > 175) and (g > 165) and (b > 135)
            # Burlap is brownish:
            is_burlap = (r > 75) and (r < 225) and (g > 55) and (g < 175) and (b < 130) and (r - b > 14)
            if is_burlap and not is_rice:
                sx = (x - 450) % 120
                clean_bg[y, x] = shelf_src[y - 240, sx]
                
    # Smooth the shelf blend region with local blur (exclude rice)
    is_rice_all = (clean_bg[:, :, 0] > 175) & (clean_bg[:, :, 1] > 165) & (clean_bg[:, :, 2] > 135)
    patch_mask = np.zeros((h, w), dtype=bool)
    patch_mask[235:535, 445:715] = True
    patch_mask = patch_mask & (~is_rice_all)
    blurred_shelf = gaussian_filter(clean_bg, sigma=[2.0, 3.5, 0])
    clean_bg[patch_mask] = blurred_shelf[patch_mask]
    
    # 3. Clean the left side burlap (x in 40..250, y in 200..650)
    # Wall source: x in 5..45, y in 200..400
    wall_src = orig_arr[200:400, 5:45] # shape (200, 40, 3)
    # Table source: x in 5..45, y in 400..650
    table_src = orig_arr[400:650, 5:45] # shape (250, 40, 3)
    
    for y in range(200, 400):
        for x in range(40, 250):
            r, g, b = clean_bg[y, x]
            if (r > 60 and g > 45 and b < 110 and r - b > 10) or (x < 190 and y > 240):
                sx = (x - 40) % 40
                clean_bg[y, x] = wall_src[y - 200, sx]
                
    for y in range(400, 650):
        for x in range(40, 250):
            r, g, b = clean_bg[y, x]
            if (r > 65 and g > 50 and b < 120 and r - b > 10) or (x < 190):
                sx = (x - 40) % 40
                clean_bg[y, x] = table_src[y - 400, sx]
                
    # Smooth left transition boundaries
    left_mask = np.zeros((h, w), dtype=bool)
    left_mask[195:655, 35:255] = True
    blurred_left = gaussian_filter(clean_bg, sigma=[2.0, 4.0, 0])
    # Blend 50%
    clean_bg[left_mask] = clean_bg[left_mask] * 0.4 + blurred_left[left_mask] * 0.6
    
    # 4. Save clean background to check
    bg_img = Image.fromarray(np.clip(clean_bg, 0, 255).astype(np.uint8)).convert('RGBA')
    bg_img.convert('RGB').save('scratch/bg_perfect_v2.jpg', quality=95)
    print('Clean background saved to scratch/bg_perfect_v2.jpg')
    
    # 5. Composite shadows and Monagrow bag
    shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    s_arr = np.array(shadow_layer)
    yy, xx = np.ogrid[:h, :w]
    
    base_y = pos_y + target_h - 15
    base_x = pos_x + target_w // 2
    
    # Contact shadow
    dist_c = ((xx - base_x) / (target_w * 0.44))**2 + ((yy - base_y) / 16)**2
    c_mask = dist_c <= 1.0
    s_arr[c_mask, 3] = (220 * (1 - dist_c[c_mask])).astype(np.uint8)
    
    # Soft cast shadow towards the right
    dist_d = ((xx - (base_x + 65)) / (target_w * 0.65))**2 + ((yy - (base_y + 10)) / 36)**2
    d_mask = dist_d <= 1.0
    s_arr[d_mask, 3] = np.maximum(s_arr[d_mask, 3], (130 * (1 - dist_d[d_mask])).astype(np.uint8))
    
    shadow_img = Image.fromarray(s_arr, 'RGBA').filter(ImageFilter.GaussianBlur(12))
    
    composite = bg_img.copy()
    composite.alpha_composite(shadow_img)
    composite.alpha_composite(bag_scaled, (pos_x, pos_y))
    
    final_rgb = composite.convert('RGB')
    final_rgb.save('scratch/banner_rice_v2.jpg', quality=96)
    print('Banner v2 saved to scratch/banner_rice_v2.jpg!')

build_perfect_v2()
