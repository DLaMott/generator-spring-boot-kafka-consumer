'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const log = console.log;
const shell = require('shelljs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    logSuccess(msg) {
        log(chalk.bold.green(msg));
    }


    logError(msg) {
        log(chalk.bold.red(msg));
    }

    _formatCode(configOptions) {
        if (configOptions.buildTool === 'maven') {
            this._formatCodeMaven();
        } else {
            this._formatCodeGradle();
        }
    }

    _formatCodeGradle() {
        const command = this._isWin() ? 'gradlew' : './gradlew';
        shell.exec(`${command} googleJavaFormat`);
    }

    _isWin() {
        return process.platform === 'win32';
    }
};
