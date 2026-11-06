import numpy as np
from PIL import Image
from scipy import ndimage

def hsv_to_rgb(h, s, v):
    i = np.floor(h * 6.0).astype(int)
    f = (h * 6.0) - i
    p = v * (1.0 - s)
    q = v * (1.0 - s * f)
    t = v * (1.0 - s * (1.0 - f))
    i = i % 6
    r = np.choose(i, [v, q, p, p, t, v])
    g = np.choose(i, [t, v, v, q, p, p])
    b = np.choose(i, [p, p, t, v, v, q])
    return np.dstack((r, g, b)) * 255.0

orig_img = Image.open("public/assets/monagrow-roasted-coffee-beans-cutout.png").convert("RGBA")
orig_arr = np.array(orig_img, dtype=np.float32)

rgb = orig_arr[:, :, :3]
alpha = orig_arr[:, :, 3]

r_n = rgb[:, :, 0] / 255.0
g_n = rgb[:, :, 1] / 255.0
b_n = rgb[:, :, 2] / 255.0

cmax = np.maximum(np.maximum(r_n, g_n), b_n)
cmin = np.minimum(np.minimum(r_n, g_n), b_n)
delta = cmax - cmin

h = np.zeros_like(r_n)
mask = delta > 0.0001
m_r = mask & (cmax == r_n)
h[m_r] = (((g_n[m_r] - b_n[m_r]) / delta[m_r]) % 6.0) / 6.0
m_g = mask & (cmax == g_n)
h[m_g] = (((b_n[m_g] - r_n[m_g]) / delta[m_g]) + 2.0) / 6.0
m_b = mask & (cmax == b_n)
h[m_b] = (((r_n[m_b] - g_n[m_b]) / delta[m_b]) + 4.0) / 6.0

s = np.zeros_like(r_n)
s[cmax > 0.0001] = delta[cmax > 0.0001] / cmax[cmax > 0.0001]
v = cmax

# 1. Protect white text
is_white_text = (v > 0.65) & (s < 0.28) & (rgb[:, :, 0] > 160) & (rgb[:, :, 1] > 150) & (rgb[:, :, 2] > 140)

# 2. Protect beans & leaves
cluster_mask = np.zeros_like(r_n, dtype=bool)
cluster_mask[500:800, 375:750] = True
c_r = rgb[:, :, 0]
c_g = rgb[:, :, 1]
c_b = rgb[:, :, 2]
is_red_bg = (c_r > 40) & (c_g < c_r * 0.32) & (c_b < c_r * 0.40) & (c_g < 42)
is_beans_leaves = cluster_mask & (~is_red_bg)
is_beans_leaves = ndimage.binary_fill_holes(is_beans_leaves)
labeled, num = ndimage.label(is_beans_leaves)
sizes = ndimage.sum(is_beans_leaves, labeled, range(num + 1))
is_beans_leaves = (sizes > 200)[labeled]
is_beans_leaves = ndimage.binary_fill_holes(is_beans_leaves)
protected_beans = ndimage.binary_dilation(is_beans_leaves, iterations=2)

# 3. Protect gold ribbon
is_gold_ribbon = (h > 0.07) & (h < 0.18) & (s > 0.25) & (v > 0.35)

# 4. Protect cream paper
is_cream_paper = (np.arange(1024)[:, None] < 470) & (v > 0.75) & (s < 0.25)

# 5. Red pixels that change color:
red_pixels = ((h < 0.06) | (h > 0.94)) & (s > 0.25) & (v > 0.05) & (alpha > 40)
change_mask = red_pixels & (~is_white_text) & (~protected_beans) & (~is_gold_ribbon) & (~is_cream_paper)

# Soft transition mask
soft_mask = ndimage.gaussian_filter(change_mask.astype(np.float32), sigma=0.8)

# Target Navy Blue: Hue = 0.60 (216 deg)
h_blue = h * (1.0 - soft_mask) + 0.60 * soft_mask
s_blue = s * (1.0 - soft_mask) + np.clip(s * 1.05, 0, 0.95) * soft_mask
v_blue = v * (1.0 - soft_mask) + np.clip(v * 0.92, 0, 1.0) * soft_mask

rgb_blue = hsv_to_rgb(h_blue, s_blue, v_blue)

# Also tint the top bird logo to navy blue (in Y < 470, red pixels)
top_logo_mask = (np.arange(1024)[:, None] < 470) & (rgb[:, :, 0] > 60) & (rgb[:, :, 1] < 35) & (rgb[:, :, 2] < 35)
rgb_blue[top_logo_mask, 0] = 18
rgb_blue[top_logo_mask, 1] = 45
rgb_blue[top_logo_mask, 2] = 105

out_arr = np.dstack((rgb_blue, alpha)).astype(np.uint8)
img_out = Image.fromarray(out_arr, "RGBA")
img_out.save("scratch/test_blue_exact_text.png")
print("Saved scratch/test_blue_exact_text.png")

