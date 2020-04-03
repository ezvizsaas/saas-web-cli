projectName=11aa
npm config get registry https://registry.npm.taobao.org/
npm install
npm run build
echo "remove devDependencies"
npm prune --prod
echo "delete ${projectName}"
rm -r ${projectName}
echo "mkdir ${projectName}"
mkdir ${projectName}
echo "mv files to ${projectName}"
mv ./build/*  ${projectName}
echo "zip to build.zip"
zip -r build.zip ${projectName}
echo "这里是打包文件的解压"