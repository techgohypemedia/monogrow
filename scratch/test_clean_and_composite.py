import numpy as np
from PIL import Image, ImageFilter
from skimage.restoration import inpaint_biharmonic
from scipy.ndimage import binary_dilation, gaussian_filter

def build_perfect_scene():
    print('Loading base banner...')
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    orig_arr = np.array(orig).astype(np.float32)
    h, w, _ = orig_arr.shape
    
    clean_bg = orig_arr.copy()
    
    # 1. Clean the burlap opening (x in 500..660, y in 220..460)
    # Background to the right: x in 660..780, y in 220..460 is dark stone wall and shelf shadow.
    # We extend this background over the burlap opening.
    bg_shelf = orig_arr[220:460, 660:780] # shape (240, 120, 3)
    
    # Identify burlap in this opening zone:
    for y in range(220, 460):
        for x in range(500, 660):
            r, g, b = clean_bg[y, x]
            # Burlap is brownish: r > 70, g > 50, b < 130, r - b > 18
            # Do NOT touch rice (r > 175, g > 165, b > 140)
            is_rice = (r > 175) and (g > 165) and (b > 140)
            is_burlap = (r > 70) and (r < 220) and (g > 50) and (g < 170) and (b < 125) and (r - b > 15)
            if is_burlap and not is_rice:
                # Sample from shelf shadow
                sx = (x - 500) % 120
                clean_bg[y, x] = bg_shelf[y - 220, sx]
                
    # Smooth the shelf blend region with local blur
    shelf_mask = np.zeros((h, w), dtype=bool)
    shelf_mask[220:460, 500:660] = True
    blurred_shelf = gaussian_filter(clean_bg, sigma=[2.0, 3.0, 0])
    clean_bg[shelf_mask] = blurred_shelf[shelf_mask]
    
    # 2. Inpaint the left side of the burlap sack (x in 80..260, y in 200..670)
    # Define exact burlap mask on the left:
    left_burlap = (
        (clean_bg[:, :, 0] > 70) & (clean_bg[:, :, 0] < 220) &
        (clean_bg[:, :, 1] > 50) & (clean_bg[:, :, 1] < 180) &
        (clean_bg[:, :, 2] < 130) &
        (clean_bg[:, :, 0] - clean_bg[:, :, 2] > 18)
    )
    left_mask = np.zeros((h, w), dtype=bool)
    left_mask[200:670, 80:260] = left_burlap[200:670, 80:260]
    left_mask = binary_dilation(left_mask, iterations=4)
    
    print('Inpainting left burlap...')
    clean_bg_norm = clean_bg / 255.0
    inpainted = inpaint_biharmonic(clean_bg_norm, left_mask, channel_axis=-1)
    clean_bg = inpainted * 255.0
    
    # Save the cleaned background for verification
    bg_clean_img = Image.fromarray(np.clip(clean_bg, 0, 255).astype(np.uint8)).convert('RGBA')
    bg_clean_img.convert('RGB').save('scratch/bg_clean_verified.jpg', quality=95)
    print('Saved scratch/bg_clean_verified.jpg')
    
    # 3. Place the authentic Monagrow Rice Bag
    bag_raw = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')
    target_h = 660
    target_w = int(bag_raw.width * (target_h / bag_raw.height)) # 426
    bag_scaled = bag_raw.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = 230
    pos_y = 65
    
    composite = bg_clean_img.copy()
    
    # 4. Realistic contact shadow under the base and right edge of the bag
    shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    s_arr = np.array(shadow_layer)
    yy, xx = np.ogrid[:h, :w]
    
    base_y = pos_y + target_h - 15
    base_x = pos_x + target_w // 2
    
    # Contact shadow
    dist_c = ((xx - base_x) / (target_w * 0.44))**2 + ((yy - base_y) / 18)**2
    c_mask = dist_c <= 1.0
    s_arr[c_mask, 3] = (210 * (1 - dist_c[c_mask])).astype(np.uint8)
    
    # Diffuse shadow cast right (since light comes from left window)
    dist_d = ((xx - (base_x + 70)) / (target_w * 0.65))**2 + ((yy - (base_y + 12)) / 40)**2
    d_mask = dist_d <= 1.0
    s_arr[d_mask, 3] = np.maximum(s_arr[d_mask, 3], (130 * (1 - dist_d[d_mask])).astype(np.uint8))
    
    shadow_img = Image.fromarray(s_arr, 'RGBA').filter(ImageFilter.GaussianBlur(12))
    composite.alpha_composite(shadow_img)
    
    # 5. Composite the Monagrow bag
    composite.alpha_composite(bag_scaled, (pos_x, pos_y))
    
    # 6. Foreground Rice mound blending:
    # Take authentic spilled rice from orig at x > 580, y > 520
    is_rice = (orig_arr[:, :, 0] > 180) & (orig_arr[:, :, 1] > 170) & (orig_arr[:, :, 2] > 145)
    overlap_rice = is_rice.copy()
    overlap_rice[:540, :] = False
    overlap_rice[730:, :] = False
    overlap_rice[:, :540] = False
    overlap_rice[:, 700:] = False
    
    rice_fg = np.zeros_like(orig_arr)
    rice_fg[overlap_rice] = orig_arr[overlap_rice]
    rice_fg_img = Image.fromarray(rice_fg.astype(np.uint8), 'RGBA')
    composite.alpha_composite(rice_fg_img)
    
    final_img = composite.convert('RGB')
    final_img.save('scratch/final_banner_preview.jpg', quality=96)
    print('Final banner saved to scratch/final_banner_preview.jpg')

build_perfect_scene()
