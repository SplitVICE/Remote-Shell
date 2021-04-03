module.exports = function openApp(host) {
    const env_conf = require('../config/env');

    if (env_conf.TEST_MODE == 'FALSE') {
        const { exec } = require('child_process');
        exec(`explorer "http://${host}"`); // Opens the app on the browser.
    }
}