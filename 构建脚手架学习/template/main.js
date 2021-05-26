#! /usr/bin/env node

const cmd = require("commander");
const chalk = require('chalk')
const downGit = require('./src/downLoad');
const options = require('./src/options');

cmd.command('init').description('初始化模板').action(async (args) => {
    typeof args !== 'string' && (console.log(chalk.red('缺少必填参数')), process.exit(1))
    // 填选项
    // await options()
    // 拉取
    await downGit(args)
})

cmd.parse(process.argv) 