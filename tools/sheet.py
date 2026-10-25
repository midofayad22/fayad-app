import sys
from PIL import Image
out, name = sys.argv[1], sys.argv[2]
ims = [Image.open(f"{out}/{name}-{t}-{l}.png") for t in ("light","dark") for l in ("ar","en")]
w,h = ims[0].size; s = 0.5 if w > 800 else 0.9
sh = Image.new("RGB",(int(w*s)*2+10,int(h*s)*2+10),(128,128,128))
for i,im in enumerate(ims): sh.paste(im.resize((int(w*s),int(h*s))),((i%2)*(int(w*s)+10),(i//2)*(int(h*s)+10)))
sh.save(f"{out}/sheet-{name}.png")
