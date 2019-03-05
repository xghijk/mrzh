#!/bin/bash

# set -x
set -e

echo "mirror site"
httrack https://www.onebiji.com/tools/mrzh/pfcxq/wap/ +'newsimg.5054399.com/*' -%T -%P -F 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36 4399_sykb' -i

echo "read extended images from json"
sed -e 's#\\/#/#g' newsimg.5054399.com/survive/static/chengpin/wap/v1/js/data*.js |
    egrep -o '//newsimg[^?"]+' |
    xargs -I% bash -c 'F="%";echo downloading $F;[ -f "${F:2}" ]||{ mkdir -p $(dirname ${F:2});curl http:$F -o ${F:2};}'

echo "copying files to output"
mkdir -p output
[ -d output/cdn ] || rm -r output/cdn output/*.html
rsync -a newsimg.5054399.com/ output/cdn/
cp www.onebiji.com/tools/mrzh/pfcxq/wap/index.html output/index.html

cd output

echo "convert everything from GBK to UTF-8"
chardetect $(find . -name \*.html -o -name \*.js) | grep GB2312 | cut -d: -f1 | xargs -I% sh -c 'F="%";iconv -c -f gbk -t utf-8 "$F">"$F.out"&&mv "$F.out" "$F"'
sed -i '' -e 's#"gb2312"#"UTF-8"#g' index.html

echo "disable UA check"
sed -i '' -e 's#/4399_sykb/#/ /#g' $(find . -name \*.html -o -name \*.js)

echo "Remove watermark"
sed -i '' -e 's#url(../images/shuibg.png) ##g' cdn/survive/static/chengpin/wap/v1/css/style_e2.css

echo "Removing ad and web stats"
rm cdn/js/kbtj.js cdn/mobileStyle/hykbComment/js/comment.js

echo "Add my own Github ribbon"
python3 - <<EOF
# Template from https://github.com/tholman/github-corners
ribbon = """
<a href="https://github.com/xghijk/mrzh" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
"""
target = "index.html"

with open(target) as f:
    content = f.read()
    pos = content.rfind('</body>')

with open(target, 'w') as f:
    # insert to the end of <body> tag
    f.write(content[:pos] + ribbon + content[pos:])
EOF

echo "sanitize string and make output"
sed -i '' -E -e 's#"[./\\]+newsimg.5054399.com#"cdn#g' -e 's#\?1"#"#g' $(find . -name \*.html -o -name \*.js)

echo "Upload to git."
git add --all
git commit -m "mirror.sh output [$(date)]"
git push

cd ..
git add newsimg.5054399.com www.onebiji.com
git commit -m "mirror.sh output [$(date)]"
git push
