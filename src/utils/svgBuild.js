const fs = require("fs");

const { readFileSync, readdirSync } = fs;

function recursivelyFindSvg(dir) {
  const svgObj = {};
  const dirents = readdirSync(dir, {
    withFileTypes: true, // 将文件作为fs.Dirent对象返回,
    //fs.Dirent 是目录项（可以是文件或目录中的子目录）的表示，通过读取 fs.Dir 返回。 目录项是文件名和文件类型对的组合。
  });
  // console.log(dirents) // { name: 'guanyuwomeng1.svg', [Symbol(type)]: 1 }
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      // 判断是否一个目录
      recursivelyFindSvg(dir + dirent.name + "/"); //递归获取svg文件内容
    } else {
      // 读取文件信息并用repalce方法，利用第一步的正则匹配转换svg文件
      const svg = readFileSync(dir + dirent.name).toString();
      const fileName = dirent.name.split(".")[0];
      svgObj[fileName] = JSON.stringify(svg);
    }
  }
  return svgObj;
}

module.exports = {
  recursivelyFindSvg,
};
