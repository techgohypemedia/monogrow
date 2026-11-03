import numpy as np
from PIL import Image, ImageFilter
from skimage.restoration import inpaint_biharmonic
from scipy.ndimage import binary_dilation, gaussian_filter

def create_flawless_banner():
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
    
    # 2. Cover the burlap sack opening (x: 450..640, y: 220..420)
    # Right behind it (x: 640..780, y: 220..420) is the dark stone wall and shelf shadow.
    # Let's clone this dark background across x: 450..640, y: 220..420 with horizontal continuity:
    wall_slice = orig_arr[220:420, 640:760] # 200 x 120
    for y in range(220, 420):
        for x in range(450, 640):
            # Only replace if NOT rice (rice is bright: r > 180, g > 170, b > 140)
            r, g, b = clean_bg[y, x]
            if not (r > 175 and g > 165 and b > 135):
                # Sample from wall slice
                sx = (x - 450) % 120
                clean_bg[y, x] = wall_slice[y - 220, sx]
                
    # Soften the cloned wall region so there are no seams
    wall_patch_mask = np.zeros((h, w), dtype=bool)
    wall_patch_mask[215:425, 440:650] = True
    # Exclude rice from blur
    is_rice = (clean_bg[:, :, 0] > 175) & (clean_bg[:, :, 1] > 165) & (clean_bg[:, :, 2] > 135)
    wall_patch_mask = wall_patch_mask & (~is_rice)
    blurred_wall = gaussian_filter(clean_bg, sigma=[2.0, 3.0, 0])
    clean_bg[wall_patch_mask] = blurred_wall[wall_patch_mask]
    
    # 3. Inpaint the left side of the burlap sack (x in 80..240, y in 200..670)
    # Inpaint biharmonic on the left burlap area:
    left_burlap = (
        (clean_bg[:, :, 0] > 70) & (clean_bg[:, :, 0] < 220) &
        (clean_bg[:, :, 1] > 50) & (clean_bg[:, :, 1] < 180) &
        (clean_bg[:, :, 2] < 130) &
        (clean_bg[:, :, 0] - clean_bg[:, :, 2] > 18)
    )
    left_mask = np.zeros((h, w), dtype=bool)
    left_mask[200:670, 80:240] = left_burlap[200:670, 80:240]
    left_mask = binary_dilation(left_mask, iterations=4)
    
    print('2. Inpainting left wall/table transition...')
    clean_bg_norm = clean_bg / 255.0
    inpainted = inpaint_biharmonic(clean_bg_norm, left_mask, channel_axis=-1)
    clean_bg = inpainted * 255.0
    
    # Create clean background RGBA
    bg_img = Image.fromarray(np.clip(clean_bg, 0, 255).astype(np.uint8)).convert('RGBA')
    
    # 4. Create natural contact and directional shadow for the Monagrow bag
    shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    s_arr = np.array(shadow_layer)
    yy, xx = np.ogrid[:h, :w]
    
    base_y = pos_y + target_h - 14
    base_x = pos_x + target_w // 2
    
    # Ambient occlusion right under the base
    dist_c = ((xx - base_x) / (target_w * 0.44))**2 + ((yy - base_y) / 16)**2
    c_mask = dist_c <= 1.0
    s_arr[c_mask, 3] = (220 * (1 - dist_c[c_mask])).astype(np.uint8)
    
    # Soft cast shadow towards the right (warm light coming from left window)
    dist_d = ((xx - (base_x + 65)) / (target_w * 0.65))**2 + ((yy - (base_y + 10)) / 36)**2
    d_mask = dist_d <= 1.0
    s_arr[d_mask, 3] = np.maximum(s_arr[d_mask, 3], (130 * (1 - dist_d[d_mask])).astype(np.uint8))
    
    shadow_img = Image.fromarray(s_arr, 'RGBA').filter(ImageFilter.GaussianBlur(12))
    
    # 5. Composite layers
    composite = bg_img.copy()
    composite.alpha_composite(shadow_img)
    composite.alpha_composite(bag_scaled, (pos_x, pos_y))
    
    # 6. Spilled rice foreground integration:
    # Blend genuine white rice grains over the bottom-right corner of the bag
    # so the rice mound flows naturally around and in front of the bag base!
    overlap_rice = is_rice.copy()
    overlap_rice[:pos_y + target_h - 130, :] = False
    overlap_rice[pos_y + target_h + 30:, :] = False
    overlap_rice[:, :pos_x + 290] = False
    overlap_rice[:, pos_x + target_w + 80:] = False
    
    rice_fg = np.zeros((h, w, 4), dtype=np.uint8)
    rice_fg[overlap_rice, :3] = orig_arr[overlap_rice].astype(np.uint8)
    rice_fg[overlap_rice, 3] = 255
    rice_fg_img = Image.fromarray(rice_fg, 'RGBA')
    composite.alpha_composite(rice_fg_img)
    
    # Save final image
    final_rgb = composite.convert('RGB')
    final_rgb.save('scratch/flawless_banner_rice.jpg', quality=96)
    print('Flawless banner saved to scratch/flawless_banner_rice.jpg!')

create_flawless_banner()
