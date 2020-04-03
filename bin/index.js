const yeoman = require('yeoman-environment');
const program = require("commander");
const path = require("path");
// const color = require('colors-cli');

program
  .version('1.0.0')
  .description('Fake package manager')
  .parse(process.argv);
const env = yeoman.createEnv();

// program.on('--help', function () {
//   console.log('');
//   console.log(color.yellow('  YS Generator'));
//   console.log(color.cyan('  powered by ezviz-sass-team'));
//   console.log('');
// });
const generatorPath = path.join(__dirname, '../generators/app');
env.register(generatorPath, 'YS:app');
env.run('YS:app', function () { });