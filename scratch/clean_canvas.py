import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter

def create_clean_canvas():
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    arr = np.array(orig).astype(np.float32)
    h, w, _ = arr.shape
    
    # 1. Base clean image
    clean = arr.copy()
    
    # Let's inspect the rice mound on the right:
    # Rice is at x > 480, y > 380.
    # Specifically, rice grains have: R > 160, G > 150, B > 130
    is_rice = (arr[:, :, 0] > 165) & (arr[:, :, 1] > 155) & (arr[:, :, 2] > 135)
    # Only keep rice in the mound area: x > 440, y > 380
    rice_preserve = np.zeros((h, w), dtype=bool)
    rice_preserve[380:, 440:] = is_rice[380:, 440:]
    
    # 2. Reconstruct the wall (y: 180..410, x: 80..620)
    # The wall is naturally dark with soft focus.
    # Left wall slice: x in 20..100, y in 180..410
    wall_left = arr[180:410, 20:100]
    # Right wall slice: x in 630..730, y in 180..410
    wall_right = arr[180:410, 630:730]
    
    # Interpolate background lighting from left (window light) to right (shadow)
    # for each x in 80..620:
    for x in range(80, 620):
        t = (x - 80) / (620 - 80) # 0 at left, 1 at right
        # Sample x from left and right with tiling
        sx_l = (x - 80) % 80
        sx_r = (x - 80) % 100
        sample_l = wall_left[:, sx_l]
        sample_r = wall_right[:, sx_r]
        # Blend with smooth gradient
        clean[180:410, x] = sample_l * (1 - t) + sample_r * t
        
    # 3. Reconstruct the slate table (y: 410..670, x: 80..580)
    # Left table slice: x in 20..120, y in 410..670 (height 260, width 100)
    table_left = arr[410:670, 20:120]
    # Bottom table slice: x in 80..580, y in 680..760 (height 80)
    table_bot = arr[680:760, 80:580]
    
    for x in range(80, 580):
        sx = (x - 80) % 100
        # Add subtle vertical gradient: brighter near table edge y=410, darker towards front y=670
        clean[410:670, x] = table_left[:, sx]
        
    # Blend the seam between wall and table at y=405..415
    seam_mask = np.zeros((h, w), dtype=bool)
    seam_mask[400:420, 80:580] = True
    blurred_seam = gaussian_filter(clean, sigma=[2.0, 4.0, 0])
    clean[seam_mask] = blurred_seam[seam_mask]
    
    # Smooth horizontal texture transitions
    horiz_blur = gaussian_filter(clean, sigma=[1.0, 3.0, 0])
    trans_area = np.zeros((h, w), dtype=bool)
    trans_area[180:670, 80:580] = True
    # Blend 30% blur to eliminate repetitive high frequencies while preserving stone grain
    clean[trans_area] = clean[trans_area] * 0.7 + horiz_blur[trans_area] * 0.3
    
    # Re-apply the preserved genuine rice grains over the right side
    clean[rice_preserve] = arr[rice_preserve]
    
    # Add a soft contact shadow on the table surface where the rice mound sits
    # (around x: 440..600, y: 440..580)
    
    result = Image.fromarray(np.clip(clean, 0, 255).astype(np.uint8))
    result.save('scratch/clean_canvas.jpg', quality=95)
    print('Clean canvas saved!')

create_clean_canvas()
