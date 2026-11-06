import numpy as np
from PIL import Image
from scipy import ndimage

# Load the authentic original cutout
orig_img = Image.open("public/assets/monagrow-roasted-coffee-beans-cutout.png").convert("RGBA")
orig_arr = np.array(orig_img, dtype=np.float32)

rgb = orig_arr[:, :, :3]
alpha = orig_arr[:, :, 3]

# Convert RGB to HSV
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

# 1. Protect the white text:
# The white text on the pouch has high brightness (V > 0.70) and low saturation (S < 0.25).
is_white_text = (v > 0.65) & (s < 0.28) & (rgb[:, :, 0] > 160) & (rgb[:, :, 1] > 150) & (rgb[:, :, 2] > 140)

# 2. Protect the coffee beans & leaves:
# In the cluster region Y: 500 to 800, X: 375 to 750
cluster_mask = np.zeros_like(r_n, dtype=bool)
cluster_mask[500:800, 375:750] = True
c_r = rgb[:, :, 0]
c_g = rgb[:, :, 1]
c_b = rgb[:, :, 2]
# In the background burgundy pouch: G is very low (< 42 and < 0.32 * R)
is_red_bg = (c_r > 40) & (c_g < c_r * 0.32) & (c_b < c_r * 0.40) & (c_g < 42)
is_beans_leaves = cluster_mask & (~is_red_bg)
is_beans_leaves = ndimage.binary_fill_holes(is_beans_leaves)
labeled, num = ndimage.label(is_beans_leaves)
sizes = ndimage.sum(is_beans_leaves, labeled, range(num + 1))
is_beans_leaves = (sizes > 200)[labeled]
is_beans_leaves = ndimage.binary_fill_holes(is_beans_leaves)
protected_beans = ndimage.binary_dilation(is_beans_leaves, iterations=2)

# 3. Protect the gold ribbon:
# The gold ribbon has H between 0.08 and 0.16, S > 0.30, V in [0.4, 0.9]
is_gold_ribbon = (h > 0.07) & (h < 0.18) & (s > 0.25) & (v > 0.35)

# 4. Protect top cream paper:
# Y < 470 and high V, low S
is_cream_paper = (np.arange(1024)[:, None] < 470) & (v > 0.75) & (s < 0.25)

# 5. Red pixels that MUST change color:
# Red hue: (h < 0.06 | h > 0.94), S > 0.25, V > 0.05, alpha > 40
red_pixels = ((h < 0.06) | (h > 0.94)) & (s > 0.25) & (v > 0.05) & (alpha > 40)

# Exclude protected areas!
change_mask = red_pixels & (~is_white_text) & (~protected_beans) & (~is_gold_ribbon) & (~is_cream_paper)

# Soft transition mask
soft_mask = ndimage.gaussian_filter(change_mask.astype(np.float32), sigma=0.8)

print("Red pixels to transform:", np.sum(change_mask))
print("White text pixels protected:", np.sum(is_white_text & (np.arange(1024)[:, None] > 470)))
print("Beans/leaves pixels protected:", np.sum(is_beans_leaves))

