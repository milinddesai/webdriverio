import { config as baseConfig } from './wdio.conf';

const chromeArgs = [
    '--user-data-dir=/tmp/chrome-tmp',
    '--no-sandbox',
    '--disable-infobars',
    '--window-size=1440,735'
];
if (process.env.CI === 'true') {
    chromeArgs.push('--headless', '--disable-gpu');
}

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
            args: chromeArgs
        }
    }],
};
