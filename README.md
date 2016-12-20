# Cli（command-line interface） 开发

1.Helloworld

##ReactNative init 发生了什么
ReactNative init 是RN官网推荐的初始化AwesomeProject，能够让迅速看到HelloWorld的命令，也是开发RN 最开始的命令。

```
react-native init AwesomeProject  --verbose

 --verbose 查看执行过程详情。
```

过程是这样的

1. 创建 AwesomeProject 文件夹
2. 创建 package.json
3. 创建 iOS，Android 初始化工程
4. 执行 npm install 安装依赖

##命令 - Cli 
windows: 可执行文件 exe cmd
Linux:bash,sh,ksh,csh,zsh

##mac 下的 Cli
1.Linux目录结构
![未标题-1-w1415](media/14815387454964/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png)

各种bin

所有用户皆可用的系统程序放在/bin

超级用户才能使用的系统程序放在/sbin

所有用户都可用的应用程序放在/usr/bin

超级用户才能使用的应用程序放在/usr/sbin

所有用户都可用的与本地机器无关的程序存放在/usr/local/bin

超级用户才能使用的与本地机器无关的程序存放在/usr/local/sbin



所以我们自己的命令行安装路径都在 /usr/local/bin 
![](media/14815387454964/14822152857728.jpg)



##Node & Node Cli

https://www.zhihu.com/question/36292298

![](media/14815387454964/14822173706905.png)


#开发第一个命令行
学语言四句诀
1. 接收参数
2. 组织参数
3. 调用逻辑层接口
4. 显示结果


###Commander
commander是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能。commander源自一个同名的Ruby项目。

安装

```
npm install --save commander
```

Demo

```
#!/usr/bin/env node

/**
 *  1.usage 使用说明
 * 	2.version 版本 -V查看
 *  3.不加参数<n>,program.what 为true，加参数为值
 */

var program = require('commander');

program
  .usage('[options] ')
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
```

###minimist


##从ReactNative Cli 开始


##XSY Cli 开发
### init
### compile
### run

###开发中的 Command
#### convert


