import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageChops

def create_variants():
    # 1. Load base banner and bag
    banner = Image.open('public/assets/about-banner-rice.jpg').convert('RGBA')
    bw, bh = banner.size # 1376, 768
    
    bag_raw = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')
    
    # 2. Reconstruct clean background (erase the burlap sack)
    # The burlap sack is in x: 100..640, y: 200..660.
    # We patch it using texture from surrounding wall and table.
    bg_clean = banner.copy()
    bg_arr = np.array(bg_clean)
    
    # Texture sources:
    # Left wall patch: x in 20..130, y in 180..380
    wall_src = bg_arr[180:380, 20:130].copy()
    # Right wall patch: x in 680..780, y in 180..380
    wall_right_src = bg_arr[180:380, 680:780].copy()
    # Left table patch: x in 20..130, y in 420..680
    table_src = bg_arr[420:680, 20:130].copy()
    
    # Tile/blend into burlap region
    patch = np.zeros_like(bg_arr)
    # Reconstruct wall (y: 180..390, x: 120..620)
    for x in range(120, 620, 100):
        w_chunk = min(100, 620 - x)
        # alternate flipping to prevent visible repetition
        sub_wall = wall_src[:, :w_chunk]
        if (x // 100) % 2 == 1:
            sub_wall = np.fliplr(sub_wall)
        bg_arr[180:380, x:x+w_chunk] = sub_wall
        
    # Reconstruct table (y: 390..660, x: 120..580)
    for x in range(120, 580, 100):
        w_chunk = min(100, 580 - x)
        sub_tbl = table_src[:, :w_chunk]
        if (x // 100) % 2 == 1:
            sub_tbl = np.fliplr(sub_tbl)
        bg_arr[420:680, x:x+w_chunk] = sub_tbl
        
    # Smooth the patch boundaries with gaussian blur mask
    bg_cleaned = Image.fromarray(bg_arr)
    
    # Extract rice mound foreground mask from original banner:
    # Rice is bright: R>175, G>165, B>145, y > 380, x > 420
    orig_arr = np.array(banner)
    rice_mask = (orig_arr[:, :, 0] > 175) & (orig_arr[:, :, 1] > 165) & (orig_arr[:, :, 2] > 145) & (orig_arr[:, :, 3] > 0)
    rice_mask[:370, :] = False
    rice_mask[:, :440] = False
    
    rice_fg = np.zeros_like(orig_arr)
    rice_fg[rice_mask] = orig_arr[rice_mask]
    rice_fg_img = Image.fromarray(rice_fg, 'RGBA')
    
    # VARIANT 1: Standing Upright Bag beside/above the spilled rice cascade
    # Positioned at x=340..660, y=100..660. The bag stands majestically on the slate table,
    # with the spilled rice mound spreading from its right base across the floor!
    v1 = bg_cleaned.copy()
    
    # Scale bag to height ~ 560px
    target_h1 = 560
    target_w1 = int(bag_raw.width * (target_h1 / bag_raw.height))
    bag_v1 = bag_raw.resize((target_w1, target_h1), Image.Resampling.LANCZOS)
    
    # Create soft contact shadow for standing bag
    shadow1 = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    # Base is at x=380, y=650
    pos_x1 = 330
    pos_y1 = 110
    
    # Shadow ellipse under bag
    s_layer = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    s_arr = np.array(s_layer)
    # Draw dark shadow ellipse cast slightly to the right (light from left window)
    yy, xx = np.ogrid[:bh, :bw]
    # Contact shadow
    dist_c = ((xx - (pos_x1 + target_w1//2 + 20)) / (target_w1 * 0.48))**2 + ((yy - (pos_y1 + target_h1 - 15)) / 22)**2
    contact_mask = dist_c <= 1.0
    s_arr[contact_mask, 3] = (180 * (1 - dist_c[contact_mask])).astype(np.uint8)
    
    # Diffuse shadow cast right
    dist_d = ((xx - (pos_x1 + target_w1//2 + 80)) / (target_w1 * 0.7))**2 + ((yy - (pos_y1 + target_h1 - 10)) / 45)**2
    diff_mask = dist_d <= 1.0
    s_arr[diff_mask, 3] = np.maximum(s_arr[diff_mask, 3], (110 * (1 - dist_d[diff_mask])).astype(np.uint8))
    
    shadow_img1 = Image.fromarray(s_arr, 'RGBA').filter(ImageFilter.GaussianBlur(12))
    
    v1.alpha_composite(shadow_img1)
    v1.alpha_composite(bag_v1, (pos_x1, pos_y1))
    
    # Layer foreground rice grains over the right edge and base of the bag
    v1.alpha_composite(rice_fg_img)
    v1.convert('RGB').save('scratch/variant_1_upright.jpg', quality=95)
    print('Variant 1 upright saved.')
    
    # VARIANT 2: Tilted / Leaning Bag (~ -22 degrees) matching the burlap sack fall
    v2 = bg_cleaned.copy()
    target_h2 = 540
    target_w2 = int(bag_raw.width * (target_h2 / bag_raw.height))
    bag_scaled2 = bag_raw.resize((target_w2, target_h2), Image.Resampling.LANCZOS)
    
    # Rotate by -22 deg (counter-clockwise tilt)
    bag_rot2 = bag_scaled2.rotate(-22, expand=True, resample=Image.Resampling.BICUBIC)
    
    # Position so its top right aligns with the spilled rice mound
    pos_x2 = 230
    pos_y2 = 180
    
    # Shadow for tilted bag
    s2_layer = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    s2_arr = np.array(s2_layer)
    dist_c2 = ((xx - 430) / 200)**2 + ((yy - 620) / 35)**2
    mask2 = dist_c2 <= 1.0
    s2_arr[mask2, 3] = (190 * (1 - dist_c2[mask2])).astype(np.uint8)
    shadow_img2 = Image.fromarray(s2_arr, 'RGBA').filter(ImageFilter.GaussianBlur(15))
    
    v2.alpha_composite(shadow_img2)
    v2.alpha_composite(bag_rot2, (pos_x2, pos_y2))
    v2.alpha_composite(rice_fg_img)
    v2.convert('RGB').save('scratch/variant_2_tilted.jpg', quality=95)
    print('Variant 2 tilted saved.')
    
    # VARIANT 3: Realistic Leaning / Sitting Angle (-12 degrees)
    # Nestled right against the rice cascade with beautiful lighting
    v3 = bg_cleaned.copy()
    target_h3 = 550
    target_w3 = int(bag_raw.width * (target_h3 / bag_raw.height))
    bag_scaled3 = bag_raw.resize((target_w3, target_h3), Image.Resampling.LANCZOS)
    bag_rot3 = bag_scaled3.rotate(-10, expand=True, resample=Image.Resampling.BICUBIC)
    
    pos_x3 = 300
    pos_y3 = 135
    
    s3_layer = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    s3_arr = np.array(s3_layer)
    dist_c3 = ((xx - 480) / 180)**2 + ((yy - 635) / 30)**2
    mask3 = dist_c3 <= 1.0
    s3_arr[mask3, 3] = (180 * (1 - dist_c3[mask3])).astype(np.uint8)
    shadow_img3 = Image.fromarray(s3_arr, 'RGBA').filter(ImageFilter.GaussianBlur(14))
    
    v3.alpha_composite(shadow_img3)
    v3.alpha_composite(bag_rot3, (pos_x3, pos_y3))
    v3.alpha_composite(rice_fg_img)
    v3.convert('RGB').save('scratch/variant_3_gentle_tilt.jpg', quality=95)
    print('Variant 3 gentle tilt saved.')

create_variants()
