#!/usr/bin/env node

/**
 *  1.usage 使用说明
 * 	2.version 版本 -V查看
 *  3.不加参数<n>,program.what 为true，加参数为值
 */

var program = require('commander');

program
  .usage('[options]  ')
  .version('0.0.1')
  .option('-p, --pen', 'I have a pen')
  .option('-a, --apple', 'I have an apple')
  .option('-e, --en', 'en')
  .option('-w, --what <n>', 'I have something')
  .parse(process.argv);

if (program.pen) {
	console.log('  - I have a pen');
}

if (program.apple) {
	console.log('  - I have an apple');
}

if (program.en){
	console.log('  - pineapple');
}

if(program.what){
	console.log(' int: %j', program.what);
}