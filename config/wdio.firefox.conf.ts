import { config as baseConfig } from './wdio.conf';

export const config = {
    ...baseConfig,
    capabilities: [{
        maxInstances: 1,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'wdio-ics:options': {
                logName: 'firefox-windows', // Custom log name for Firefox
            },
    }],
};
