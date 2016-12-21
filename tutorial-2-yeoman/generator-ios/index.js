var yeoman = require('yeoman-generator');
var path = require('path');


module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('name',{type:String,required:true})
  },

  writing: function() { 
    this.fs.copy(
      this.templatePath(path.join('AppDelegate.h')),
      this.destinationPath(path.join('ios', 'AppDelegate.h'))
    );

    var templateVars = {name: this.name};
    this.fs.copyTpl(
      this.templatePath(path.join('AppDelegate.m')),
      this.destinationPath(path.join('ios', 'AppDelegate.m')),
      templateVars
    );
  },

  install: function() {

  },

  end:function(){
      var projectPath = path.resolve(this.destinationRoot(), 'ios', this.name);
      this.log('destinationPath：'+ projectPath)
  }

});