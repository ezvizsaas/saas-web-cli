const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');

module.exports = class SaaSGenerator extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }


  prompting() {
    this.saasOption = {};
    const dirname = process
      .cwd()
      .split(path.sep)
      .pop();
    const prompts = [
      {
        type: 'confirm',
        name: 'createPro',
        message: '是否在当前目录创建项目文件夹(是：创建新的项目文件夹；否：当前目录为项目目录)',
      },
      {
        type: 'input',
        name: 'projectName',
        message: '项目名称',
        default: dirname
      },

      {
        type: 'input',
        name: 'htmlTitle',
        message: '页面的title',
        default: 'saas小应用'
      },
      {
        type: 'list',
        name: 'template',
        message: '项目模板',
        choices: ['web-app'],
        default: 'web-app'
      },
      {
        type: 'list',
        name: 'proxy',
        message: '代理地址',
        choices: ['https://saastest3.ys7.com', "https://saastest4.ys7.com"],
        default: 'https://saastest3.ys7.com'
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.saasOption = answers;
    })
  }
  writing() {
    console.log(this.saasOption);
    let destinationPath = this.saasOption.projectName;
    if (!this.saasOption.createPro) {
      destinationPath = "";
    }
    console.log("templatePath", this.templatePath());
    console.log("destinationPath", this.destinationPath(destinationPath));
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(destinationPath),
      this.saasOption
    );
    console.log("!!!!!!!!!");
  }

  install() {
    // this.destinationRoot(this.saasOption.name);
    // this.npmInstall();
  }
  // add your own methods
};