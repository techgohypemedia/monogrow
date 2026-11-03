import numpy as np
from PIL import Image

def analyze_placement():
    orig = Image.open('public/assets/about-banner-rice.jpg')
    arr = np.array(orig)
    h, w, _ = arr.shape # 768, 1376
    
    # Load mask of burlap sack
    mask = Image.open('scratch/burlap_mask.png').convert('L')
    m_arr = np.array(mask) > 128
    
    # Burlap bounding box:
    ys, xs = np.where(m_arr)
    print(f'Burlap bounding box: x={xs.min()}..{xs.max()}, y={ys.min()}..{ys.max()}')
    # Total burlap pixels:
    total_burlap = np.sum(m_arr)
    print(f'Total burlap pixels: {total_burlap}')
    
    # Load Monagrow bag
    bag = Image.open('public/assets/monagrow-rice-bag-cutout.png').convert('RGBA')
    print(f'Raw bag size: {bag.size}')
    
    # Test different scales, angles, and positions
    best_standing = None
    min_uncovered_standing = total_burlap
    
    # Let's test standing bag at scales 0.55 to 0.70
    for target_h in range(540, 680, 20):
        target_w = int(bag.width * (target_h / bag.height))
        bag_s = bag.resize((target_w, target_h), Image.Resampling.LANCZOS)
        b_alpha = (np.array(bag_s)[:, :, 3] > 50)
        
        for pos_x in range(120, 360, 20):
            for pos_y in range(50, 180, 15):
                # Check overlap
                bag_on_screen = np.zeros((h, w), dtype=bool)
                by1, by2 = pos_y, min(h, pos_y + target_h)
                bx1, bx2 = pos_x, min(w, pos_x + target_w)
                
                ah1, ah2 = 0, by2 - by1
                aw1, aw2 = 0, bx2 - bx1
                
                bag_on_screen[by1:by2, bx1:bx2] = b_alpha[ah1:ah2, aw1:aw2]
                
                uncovered = np.sum(m_arr & (~bag_on_screen))
                if uncovered < min_uncovered_standing:
                    min_uncovered_standing = uncovered
                    best_standing = (target_w, target_h, pos_x, pos_y, uncovered)
                    
    print(f'Best standing: target_w={best_standing[0]}, target_h={best_standing[1]}, pos_x={best_standing[0]}, pos_y={best_standing[3]}, uncovered={best_standing[4]} ({best_standing[4]/total_burlap*100:.1f}%)')

analyze_placement()
