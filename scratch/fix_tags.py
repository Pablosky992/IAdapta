
import sys

with open('c:/Users/narci/Desktop/proyecto/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# SectionIntruderGame fix
# Line 2721 (0-indexed 2720) is usually the area
for i in range(2500, 2800):
    if '              </>' in lines[i] and '                </div>' in lines[i-1]:
        lines[i-1] = '                </div>\n              </div>\n'
        break

with open('c:/Users/narci/Desktop/proyecto/index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Done")
