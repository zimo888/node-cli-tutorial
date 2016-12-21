#!/usr/bin/env node

/**
 *  1.usage 使用说明
 * 	2.version 版本 -V查看
 *  3.不加参数<n>,program.what 为true，加参数为值
 */

var program = require('commander');
var genios = require('./genios/genios')

program
  .usage('-gen ')
  .version('0.0.1')
  .option('-n, --name <name> ', 'generate a ios project')
  .option('-g, --genios <path> ', 'generate a ios project')
  .parse(process.argv);


if (program.name && program.genios) {
   console.log('the path is :',program.genios)
   genios(program.genios,program.name)
}


