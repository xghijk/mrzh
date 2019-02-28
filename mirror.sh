#!/bin/bash

# set -x
set -e

echo "mirror site"
httrack https://www.onebiji.com/tools/mrzh/pfcxq/wap/ +'newsimg.5054399.com/*' -%T -%P -F 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36 4399_sykb' -i

echo "read extended images from json"
sed -e 's#\\/#/#g' newsimg.5054399.com/survive/static/chengpin/wap/v1/js/data43d4.js |
    egrep -o '//newsimg[^?"]+' |
    xargs -I% bash -c 'F="%";echo downloading $F;[ -f "${F:2}" ]||{ mkdir -p $(dirname ${F:2});curl http:$F -o ${F:2};}'

echo "copying files to output"
mkdir -p output
rsync -a newsimg.5054399.com/ output/cdn/
cp www.onebiji.com/tools/mrzh/pfcxq/wap/index.html output/index.html

cd output

echo "convert everything from GBK to UTF-8"
chardetect $(find . -name \*.html -o -name \*.js) | grep GB2312 | cut -d: -f1 | xargs -I% sh -c 'F="%";iconv -f gb2312 -t utf-8 "$F">"$F.out";mv "$F.out" "$F"'
sed -i '' -e 's#"gb2312"#"UTF-8"#g' index.html

echo "disable UA check"
sed -i '' -e 's#/4399_sykb/#/ /#g' $(find . -name \*.html -o -name \*.js)

echo "Removing ad and web stats"
rm cdn/js/kbtj.js cdn/mobileStyle/hykbComment/js/comment.js

echo "sanitize string and make output"
sed -i '' -E -e 's#"[./]+newsimg.5054399.com#"cdn#g' $(find . -name \*.html -o -name \*.js)
