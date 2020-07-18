#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

git init

git remote add origin git@gitee.com:yuxinbuhui/myblog.git

git add .
git commit -m 'deploy'

git fetch origin master:temp

git merge temp --allow-unrelated-histories



# 填写你需要发布的仓库地址
git push -f origin master

cd -
