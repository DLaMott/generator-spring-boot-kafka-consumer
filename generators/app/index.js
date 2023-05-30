'use strict';
const BaseGenerator = require('./base-generator');
const constants = require('./constants');
const prompts = require('./prompts');
const path = require('path');
const {version} = require("chai");

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        this.logSuccess('Generating SpringBoot Application')
    }

    get prompting() {
        return prompts.prompting;
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.configOptions.appName));
        this.config.set(this.configOptions);
        Object.assign(this.configOptions, constants);
        this.configOptions.formatCode = this.options.formatCode !== false
    }

    writing() {

        this._copyDynamicConfiguration();
        this._copyDynamicApp(this.configOptions);
        this._renameGitIgnore();
        if(this.configOptions.generateSampleApp){
            this._copySampleApp(this.configOptions);
        }
        this.config.set(constants.versionName, version)
    }

    install(){
        this._copyStaticConfiguration();
    }

    end() {
        if(this.configOptions.formatCode !== false) {
            this._formatCode(this.configOptions);
        }
        this._printGenerationSummary(this.configOptions);
    }

    _printGenerationSummary(configOptions) {
        this.logError("==========================================");
        this.logSuccess("Your application is generated successfully");
        this.logSuccess(`  cd ${configOptions.appName}`);
        this.logSuccess("  > ./gradlew bootRun");
        this.logError("==========================================");
    }

    _copyStaticConfiguration(){
        this.fs.copy(
            this.templatePath(constants.staticDir),
            this.destinationPath(),
            {globalOptions: {dot: true}}
        )
    }

    _copyDynamicConfiguration() {
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/config"),
            this.destinationPath(),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _copyDynamicApp(configOptions){
        let possible = configOptions.appName.split('-').join("");
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/app/Application.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/" + possible + "Application.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/app/application.properties"),
            this.destinationPath(
                'src/main/resources/application.properties'
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/app/application-local.properties"),
            this.destinationPath(
                'src/main/resources/application-local.properties'
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _renameGitIgnore(){
        this.fs.copyTpl(
            this.templatePath(constants.dynamicDir + "/rename/_gitignore"),
            this.destinationPath(
                '.gitignore'
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }

    _copySampleApp(configOptions){
        this.fs.copyTpl(
            this.templatePath("sample/ConsumerController.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/ConsumerController.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/ConsumerConfig.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/config/ConsumerConfig.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/ConsumerHelper.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/helper/ConsumerHelper.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/ConsumerMessage.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/model/ConsumerMessage.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/Data.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/model/Data.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/Metadata.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/model/Metadata.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/KafkaConsumerService.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/service/KafkaConsumerService.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/MessageHandler.java"),
            this.destinationPath(
                'src/main/java/' + configOptions.packageFolder + "/helper/MessageHandler.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/KafkaConsumerServiceTest.java"),
            this.destinationPath(
                'src/test/java/' + configOptions.packageFolder + "/service/KafkaConsumerServiceTest.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/ConsumerControllerTest.java"),
            this.destinationPath(
                'src/test/java/' + configOptions.packageFolder + "/controller/ConsumerControllerTest.java"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
        this.fs.copyTpl(
            this.templatePath("sample/logback-spring.xml"),
            this.destinationPath(
                "src/main/resources/logback-spring.xml"
            ),
            this,
            null,
            {globalOptions: {dot: true}}
        )
    }
};