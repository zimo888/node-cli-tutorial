const path = require('path');
const yeoman = require('yeoman-environment');



function init (projectDir,argsOrName){
    const env = yeoman.createEnv(
    );
    env.register(
        require.resolve(path.join(__dirname, '../generator-ios')),
        'ingage:app'
    );

    const args = Array.isArray(argsOrName)
        ? argsOrName
        : [argsOrName].concat(process.argv.slice(2));

        console.log(process.argv,args)
    const generator = env.create('ingage:app', {args: args});
    generator.destinationRoot(projectDir);
    generator.run();
}


module.exports = init;