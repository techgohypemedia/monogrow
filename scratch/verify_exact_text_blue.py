from PIL import Image
import numpy as np

im = Image.open("scratch/test_blue_exact_text.png")
arr = np.array(im)

# 1. Check text around (250, 580) where "COFFEE" is
coffee_text_patch = arr[570:590, 240:270, :3]
avg_text = np.mean(coffee_text_patch, axis=(0, 1))
print("COFFEE text RGB:", avg_text)

# 2. Check beans around (485, 680)
beans_patch = arr[670:690, 475:495, :3]
avg_beans = np.mean(beans_patch, axis=(0, 1))
print("Beans RGB:", avg_beans)
is_brown = (avg_beans[0] > avg_beans[1]) and (avg_beans[1] > avg_beans[2]) and (avg_beans[0] > 100)
print("Beans are rich roasted brown:", is_brown)

# 3. Check blue pouch background around (250, 750)
bg_patch = arr[740:760, 240:260, :3]
avg_bg = np.mean(bg_patch, axis=(0, 1))
print("Pouch background RGB:", avg_bg)
is_blue = (avg_bg[2] > avg_bg[0]) and (avg_bg[2] > avg_bg[1])
print("Background is royal blue:", is_blue)

# 4. Check gold ribbon around (500, 810)
ribbon_patch = arr[800:820, 490:520, :3]
avg_ribbon = np.mean(ribbon_patch, axis=(0, 1))
print("Ribbon RGB:", avg_ribbon)
is_gold = (avg_ribbon[0] > avg_ribbon[1]) and (avg_ribbon[1] > avg_ribbon[2]) and (avg_ribbon[0] > 180)
print("Ribbon is gold:", is_gold)

