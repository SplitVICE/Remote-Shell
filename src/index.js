async function main() {
    try {
        const Console_OutPuts = require('./libs/Console_OutPuts');
        const localIpV4Address = require("local-ipv4-address");
        const IPv4 = await localIpV4Address();
        const app = require('./server');
        const port = app.get('port');
        const Console_OutPuts_ = new Console_OutPuts(IPv4, port);

        app.listen(port, () => {
            console.log(Console_OutPuts_.init__output());

            // Auto starts the application on browser.
            const env_config = require('./config/env');
            if (env_config.OPEN_ON_BROWSER_AUTOMATICALLY == 'TRUE') {
                const openApp = require('./libs/openApp');
                openApp(IPv4 + ':' + app.get('port'));
            }
        });


    } catch (error) {
        console.log(error + `
-----------------------
Han error has happened.
-----------------------
Dependencies might not been installed. Please, run Install dependencies.bat file to install dependencies.
If the problem persists, contact support.
`);
        setTimeout(() => {
        }, 60000);
    }
}

main();