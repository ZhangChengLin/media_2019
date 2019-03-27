const path = require('path');
const fs = require('fs');

// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir, deep = 3) {
    let dirDevide = dir.split('/');
    let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
    let index = {};
    getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDevide[0], deep + 1);
    return index;
}

// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, deep) {
    let curPath = path.join(dir, curDir);
    // 达到搜索深度，停止
    if (deep) {
        if (path.extname(curDir) !== ".json") {
            obj[curDir] = encodeURI(curDir);
        }
        if (fs.statSync(curPath).isDirectory()) {
            obj[curDir] = {};
            let lists = fs.readdirSync(curPath);
            lists.forEach(list => getIndexOfPathByDeep(obj[curDir], curPath, list, deep - 1))
        }
    }

}

const dir = '03';
const paths = __dirname + "\\" + dir + "\\" + 'json.json';

fs.writeFileSync(paths, JSON.stringify(getIndexByPath(dir, 1)));
