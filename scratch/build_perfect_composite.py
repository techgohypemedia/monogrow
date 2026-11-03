import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
from skimage.restoration import inpaint_biharmonic
from scipy.ndimage import binary_dilation

def build_perfect():
    print('Loading assets...')
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGBA')
    bw, bh = orig.size # 1376, 768
    
    bag_raw = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')
    
    # Bag sizing and placement
    target_h = 660
    target_w = int(bag_raw.width * (target_h / bag_raw.height)) # ~426
    bag_scaled = bag_raw.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = 220
    pos_y = 65
    
    # Alpha mask of bag on screen
    bag_arr = np.array(bag_scaled)
    bag_alpha = bag_arr[:, :, 3] > 30
    
    bag_on_screen = np.zeros((bh, bw), dtype=bool)
    bag_on_screen[pos_y:pos_y+target_h, pos_x:pos_x+target_w] = bag_alpha
    
    # Load burlap mask
    burlap_mask = np.array(Image.open('scratch/burlap_mask.png').convert('L')) > 100
    
    # The pixels that need to be inpainted are the burlap pixels NOT covered by the bag:
    hole_mask = burlap_mask & (~bag_on_screen)
    # Dilate hole mask slightly (3px) to ensure no burlap boundary is left
    hole_mask = binary_dilation(hole_mask, iterations=4)
    # Ensure bag pixels themselves don't constrain the hole boundary
    hole_mask = hole_mask & (~bag_on_screen)
    
    print(f'Hole mask size to inpaint: {np.sum(hole_mask)} pixels')
    
    # Prepare background for inpainting
    bg_rgb = np.array(orig.convert('RGB')) / 255.0
    
    print('Inpainting burlap remnants...')
    inpainted_bg = inpaint_biharmonic(bg_rgb, hole_mask, channel_axis=-1)
    bg_clean_img = Image.fromarray((inpainted_bg * 255).astype(np.uint8)).convert('RGBA')
    bg_clean_img.convert('RGB').save('scratch/inpainted_bg_clean.jpg')
    print('Inpainted clean background saved.')
    
    # 2. Lighting and color tune for the Monagrow bag:
    # Match the warm, golden directional light from the left window:
    # Warm tone subtle overlay on left edge
    # Subtle soft contact shadow on slate table
    composite = bg_clean_img.copy()
    
    # Build soft realistic shadow
    shadow_layer = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    s_arr = np.array(shadow_layer)
    yy, xx = np.ogrid[:bh, :bw]
    
    # Contact shadow at the base of the bag (y around pos_y + target_h - 10)
    base_y = pos_y + target_h - 12
    base_x = pos_x + target_w // 2
    
    # Tight dark contact shadow under base
    dist_c = ((xx - base_x) / (target_w * 0.44))**2 + ((yy - base_y) / 16)**2
    c_mask = dist_c <= 1.0
    s_arr[c_mask, 3] = (200 * (1 - dist_c[c_mask])).astype(np.uint8)
    
    # Soft diffuse shadow extending to the right
    dist_d = ((xx - (base_x + 60)) / (target_w * 0.65))**2 + ((yy - (base_y + 10)) / 38)**2
    d_mask = dist_d <= 1.0
    s_arr[d_mask, 3] = np.maximum(s_arr[d_mask, 3], (120 * (1 - dist_d[d_mask])).astype(np.uint8))
    
    shadow_img = Image.fromarray(s_arr, 'RGBA').filter(ImageFilter.GaussianBlur(10))
    composite.alpha_composite(shadow_img)
    
    # 3. Composite the Monagrow bag
    composite.alpha_composite(bag_scaled, (pos_x, pos_y))
    
    # 4. Spilled rice foreground integration:
    # Take authentic spilled rice grains from the original banner (at x > 560, y > 460)
    # and blend them over the bottom-right corner of the bag so the rice mound flows
    # naturally around and in front of the bag base!
    orig_arr = np.array(orig)
    # Rice is bright: R > 175, G > 165, B > 145
    is_rice = (orig_arr[:, :, 0] > 180) & (orig_arr[:, :, 1] > 170) & (orig_arr[:, :, 2] > 145)
    # Only in the bottom-right overlap zone: x in pos_x + 250 .. pos_x + target_w + 100, y in pos_y + target_h - 140 .. pos_y + target_h
    overlap_rice = is_rice.copy()
    overlap_rice[:pos_y + target_h - 140, :] = False
    overlap_rice[pos_y + target_h + 30:, :] = False
    overlap_rice[:, :pos_x + 280] = False
    overlap_rice[:, pos_x + target_w + 100:] = False
    
    rice_fg = np.zeros_like(orig_arr)
    rice_fg[overlap_rice] = orig_arr[overlap_rice]
    rice_fg_img = Image.fromarray(rice_fg, 'RGBA')
    composite.alpha_composite(rice_fg_img)
    
    final_rgb = composite.convert('RGB')
    final_rgb.save('scratch/perfect_banner_rice.jpg', quality=96)
    print('Perfect banner saved to scratch/perfect_banner_rice.jpg')

build_perfect()
