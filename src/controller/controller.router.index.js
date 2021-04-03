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
 * @param { String } req.body.action action parameter to execute.
 * @param { String } req.body.instructions MsDOS instructions.
 */
controller_router_index.service__post = (req, res) => {
    if (req.body.action == undefined)
        res.json({ status: 'failed', description: 'missing required parameters' });

    const result = execute_action(req.body);

    res.json(result);
};

/**
 * Handles the action to take on the PC.
 * @param { String } body.action action parameter instruction.
 * @param { String } body.instructions console instructions if body.action == 'cmd'.
 * @returns @param { Object } JSObject returns a JavaScript object
 * which will be send to the client on res.json();
 */
function execute_action(body) {
    switch (body.action) {
        case 'shutdown':

            if (config_env.TEST_MODE == 'FALSE') {
                exec('shutdown -s -t 1'); // CMD execution command.
                return { status: 'success', description: 'action executed' };
            }
            else {
                console.log('Test mode is activated');
                return { status: 'failed', description: 'test mode activated' };
            }

        case 'restart':

            if (config_env.TEST_MODE == 'FALSE') {
                exec('shutdown -r -t 1'); // CMD execution command.
                return { status: 'success', description: 'action executed' };
            }
            else {
                console.log('Test mode is activated');
                return { status: 'failed', description: 'test mode activated' };
            }

        case 'la cachona':

            exec('explorer "https://youtu.be/JYgmLuXnENk?t=103"'); // CMD execution command.
            return { status: 'success', description: 'action executed' };

        case 'cmd':

            exec(body.instructions); // CMD execution command.
            return { status: 'success', description: 'action executed' };

        default:
            break;
    }
}


module.exports = controller_router_index;