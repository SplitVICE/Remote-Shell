const controller_router_index = {};
const config_env = require('../config/env');
const path = require('path');
const { exec } = require('child_process');

// Sends /src/public/index.html file.
controller_router_index.index = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
};

/**
 * Executes CMD processes.
 * @param { Express request object } req Brings actions to execute.
 * @param { String } req.body.action action parameter to execute.
 */
controller_router_index.service_post = (req, res) => {
    if (req.body.action == undefined)
        res.json({ status: 'failed', description: 'missing required parameters' });

    const result = execute_action(req.body.action);

    res.json(result);
};

/**
 * Handles the action to take on the PC.
 * @param { String } action action parameter instruction.
 * @returns @param { Object } JSObject returns a JavaScript object
 * which will be send to the client on res.json();
 */
function execute_action(action) {
    switch (action) {
        case 'shutdown':

            if (config_env.TEST_MODE == 'FALSE') {
                exec('shutdown -s -t 1'); // CMD execution command.
                return { status: 'success', description: 'action executed' };
            }
            else {
                console.log('Test mode is activated');
                return { status: 'failed', description: 'test mode activated' };
            }

        default:
            break;
    }
}


module.exports = controller_router_index;