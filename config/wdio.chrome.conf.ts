import { config as baseConfig } from './wdio.conf';

export const config = {
    ...baseConfig,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'wdio-ics:options': {
            logName: 'chrome-windows', // Custom log name for Chrome
        },
        'goog:chromeOptions': {
            args: [
                '--user-data-dir=/tmp/chrome-tmp',
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
                // ...other args
            ]
        }
    }],
};
