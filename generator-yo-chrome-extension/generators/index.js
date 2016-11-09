"use strict";
const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.props = {}
    this.options.update = this.options.update || this.options.U;
  },
  prompting() {},
  configuring() {},
  default () {},
  writing() {
    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('main.js')
    );
    this.fs.copy(
      this.templatePath('styles.css'),
      this.destinationPath('styles.css')
    );
    this.fs.copy(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json')
    );
    this.fs.copy(
      this.templatePath('popup.html'),
      this.destinationPath('popup.html')
    );
    mkdirp('images');
  },
  conflicts() {},
  install() {},
  end() {}
});