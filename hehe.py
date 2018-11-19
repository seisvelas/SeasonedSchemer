import urllib
import sys

link = sys.argv[1]
f = urllib.urlopen(link)
myfile = f.read()
myfile = "answercell".join(myfile.split("answercell")[1:])
for i in myfile.split("pre"):
    if "code" in i and "define" in i and "script" not in i:
        print i
