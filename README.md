
# 从React-Native cli 中学习 Node Cli 开发

1.Helloworld

```
 console.log('helloWorld')
```
保存到任意文件夹下 取名字 helloworld.js
执行 node helloworld.js

##mac 下的 Cli

1.先看 Linux目录结构


所有用户皆可用的系统程序放在/bin

超级用户才能使用的系统程序放在/sbin

所有用户都可用的应用程序放在/usr/bin

超级用户才能使用的应用程序放在/usr/sbin

所有用户都可用的与本地机器无关的程序存放在/usr/local/bin

超级用户才能使用的与本地机器无关的程序存放在/usr/local/sbin



**所以我们自己的命令行安装路径都在 /usr/local/bin**


##Node & Node Cli

一篇Nw.js 起源的文章：

https://www.zhihu.com/question/36292298



#开发第一个命令行


###Commander

commander是一个轻巧的 nodejs 模块，提供了用户命令行输入和参数解析强大功能。commander源自一个同名的Ruby项目。
任意拷贝一个空的package.json

package.json:
```
{
  "name": "xsy-test-01",
  "version": "0.0.1",
  "description": "commander",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "zimo",
  "license": "MIT",
  "dependencies": {
  }
}

```
安装 commander 
```
npm install --save commander
```

Demo

index.js

```
#!/usr/bin/env node

/**
 *  1.usage 使用说明
 *  2.version 版本 -V查看
 *  3.如果不加参数<n>的时候,program.what 为true
 *  	加了参数之后执行的时候就是真正的值。
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
	console.log('I have a pen');
}

if (program.apple) {
	console.log('I have an apple');
}

if (program.en){
	console.log('pineapple');
}

if(program.what){
	console.log(' int: %j', program.what);
}
```

文件保存为 index.js

输入

```
node index.js -h
```

我们可以看到

```
  Usage: index [options]  

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -p, --pen       I have a pen
    -a, --apple     I have an apple
    -e, --en        en
    -w, --what <n>  I have something
```

上面的 .option 方法，分别定义了帮助文件中的各个命令的简写，以及命令描述。

usage 是命令的使用方法说明。

如果想在 -w 后面加输入的参数，加上<n>,"n"可以随意定义
##ReactNative init 发生了什么


ReactNative init 是RN官网推荐的初始化AwesomeProject，能够让迅速看到HelloWorld的命令，也是开发 RN 最开始的命令。

```
react-native init AwesomeProject  --verbose

 --verbose 查看执行过程详情。
```

过程是这样的

1. 创建 AwesomeProject 文件夹
2. 创建 package.json
3. 创建 iOS，Android 初始化工程
4. 执行 npm install 安装依赖

其中前两个命令是 react-native init 命令方法中执行的
后两个是 /node_components/react-native/local-cli/cli.js 执行的

打开/usr/local/bin 下的react-native 文件


我们初始化输入的命令为 react-native init ProjectName

第一句就是要接收参数 
```
var argv = require('minimist')(process.argv.slice(2));
```

定义命令行所在的路径 /node_modules/react-native/cli.js
```
var CLI_MODULE_PATH = function() {
  return path.resolve(
    process.cwd(),
    'node_modules',
    'react-native',
    'cli.js'
  );
};
```
定义package.json 所在的路径 /node_modules/react-native/
```
var REACT_NATIVE_PACKAGE_JSON_PATH = function() {
  return path.resolve(
    process.cwd(),
    'node_modules',
    'react-native',
    'package.json'
  );
};
```

核心创建工程的方法
```
function createProject(name, verbose, rnPackage, forceNpmClient) {
  var root = path.resolve(name);
  var projectName = path.basename(root);

  console.log(
    'This will walk you through creating a new React Native project in',
    root
  );

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }
```

这个位置初始化了package.json 的内容
```
  var packageJson = {
    name: projectName,
    version: '0.0.1',
    private: true,
    scripts: {
      start: 'node node_modules/react-native/local-cli/cli.js start'
    }
  };
  //写入到根目录
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
  process.chdir(root);
 ```
如果指定了 --verbose ，打印执行过程的详细信息
```
  if (verbose) {
    runVerbose(root, projectName, rnPackage, forceNpmClient);
  } else {
  //一般我们会走到run方法中去
    run(root, projectName, rnPackage, forceNpmClient);
  }
}

function getInstallPackage(rnPackage) {
  var packageToInstall = 'react-native';
  var isValidSemver = semver.valid(rnPackage);
  if (isValidSemver) {
    packageToInstall += '@' + isValidSemver;
  } else if (rnPackage) {
    // for tar.gz or alternative paths
    packageToInstall = rnPackage;
  }
  return packageToInstall;
}
```

最后的Run方法
```
function run(root, projectName, rnPackage, forceNpmClient) {
  const yarnVersion = (!forceNpmClient) && getYarnVersionIfAvailable();
  let installCommand;
  if (yarnVersion) {
    console.log('Using yarn v' + yarnVersion);
    console.log('Installing ' + getInstallPackage(rnPackage) + '...');
    installCommand = 'yarn add ' + getInstallPackage(rnPackage) + ' --exact';
  } else {
    console.log('Installing ' + getInstallPackage(rnPackage) + ' from npm...');
    if (!forceNpmClient) {
      console.log('Consider installing yarn to make this faster: https://yarnpkg.com');
    }
    installCommand = 'npm install --save --save-exact ' + getInstallPackage(rnPackage);
  }
  
  //执行 npm install 
  exec(installCommand, function(err, stdout, stderr) {
    if (err) {
      console.log(stdout);
      console.error(stderr);
      console.error('Command `' + installCommand + '` failed.');
      process.exit(1);
    }
    checkNodeVersion();
    //下载完依赖之后，调用/node_components/react-native/local-cli/ 下的cli.js,执行 init 方法
    cli = require(CLI_MODULE_PATH());
    cli.init(root, projectName);
  });
}
```

待续：
##XSY Cli 开发
### init
### compile
### run

###开发中的 Command
#### convert


