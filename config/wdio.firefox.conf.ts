import { config as baseConfig } from './wdio.conf';

const firefoxArgs = ['--disable-plugins',];
if (process.env.CI === 'true') {
    firefoxArgs.push('--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--width=1920',
                '--height=1080');
}

export const config = {
    ...baseConfig,
    capabilities: [{
        maxInstances: 1,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'wdio-ics:options': {
            logName: 'firefox-windows', // Custom log name for Firefox
        },
        'moz:firefoxOptions': {
            args: firefoxArgs
        }
    }],
};
