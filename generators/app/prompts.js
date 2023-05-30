'use strict'

module.exports = {
    prompting
};

function prompting() {

    const done = this.async();

    const prompts = [
        {
            type: 'string',
            name: 'appName',
            validate: input =>
                /^([a-z_][a-z0-9_\-]*)$/.test(input)
                    ? true
                    : 'The application you have provided is not a valid Java package name.',
            message: 'What is the application name? example springboot-microservice',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'packageName',
            validate: input =>
                /^([a-z_][a-z0-9_]*(\.[a-z_][a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The package name you have provided is not a valid Java package name.',
            message: 'What is the default package name? Example: com.test.org',
            default: 'com.mycompany.myservice'
        },
        {
            type: 'string',
            name: 'kafkaTopic',
            validate: input =>
                /^([a-z_][a-z0-9_\-]*)$/.test(input)
                    ? true
                    : 'The topic you have provided is not a valid format.',
            message: 'What is the kafka topic name? example test-topic',
            default: 'test-topic'
        },
        {
            type: 'input',
            name: 'contextRoot',
            validate: input =>
                /^([a-z_][a-z0-9_\-]*)$/.test(input)
                    ? true
                    : 'The contextRoot you have provided is not a valid name. Example: jave-sample-ms',
            message: 'ContextRoot?',
            default: 'sample-java-ms'
        },
        {
            type: 'confirm',
            name: 'generateSampleApp',
            message: 'Sample App needed?',
        }
    ];

    this.prompt(prompts).then(answers => {
        Object.assign(this.configOptions, answers);
        this.configOptions.features = this.configOptions.features || [];
        this.configOptions.appNameStrip = this.configOptions.appName.replaceAll('-', "")
        this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
        done();
    });
}