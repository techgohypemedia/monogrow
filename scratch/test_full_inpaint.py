import numpy as np
from PIL import Image
from skimage.restoration import inpaint_biharmonic
from scipy.ndimage import binary_dilation

def test_full_inpaint():
    print('Loading banner...')
    orig = Image.open('public/assets/about-banner-rice.jpg').convert('RGB')
    orig_arr = np.array(orig).astype(np.float32) / 255.0
    h, w, _ = orig_arr.shape
    
    # Load exact burlap mask
    burlap_mask = np.array(Image.open('scratch/burlap_mask.png').convert('L')) > 100
    
    # Dilate by 3 pixels to guarantee all burlap edge fibers are covered
    dilated_mask = binary_dilation(burlap_mask, iterations=3)
    
    print(f'Inpainting full burlap mask: {np.sum(dilated_mask)} pixels...')
    inpainted = inpaint_biharmonic(orig_arr, dilated_mask, channel_axis=-1)
    
    res = Image.fromarray(np.clip(inpainted * 255.0, 0, 255).astype(np.uint8))
    res.save('scratch/full_inpaint_clean.jpg', quality=95)
    print('Saved scratch/full_inpaint_clean.jpg')

test_full_inpaint()
