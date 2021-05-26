/*
 * @Date: 2019-09-29 18:01:37
 * @information: 最后更新时间
 */
// git包
// const downLoad = require('download-git-repo')
// 动画
// const ora = require('ora')

const fs = require('fs');
const { resolve } = require('path')
const shell = require('shelljs');
const chalk = require('chalk')

let downGit = (name) => {
    
    const hasFile = shell.test('-d', name);

    if (!hasFile) {
        fs.mkdir(name);
        console.log(chalk.green(`新建文件夹 ${name} 成功！！`));
    }
    
    // 拷贝所有隐藏文件 不拷贝目录
    shell.cp('-R', `${__dirname}/template/.*`, `${resolve('./')}/${name}/`);
    // 拷贝隐藏文件以外的文件 补考呗目录
    shell.cp('-R', `${__dirname}/template/*`, `${resolve('./')}/${name}/`);

    console.log(chalk.cyan('初始化项目成功！！'))
}

module.exports = downGit