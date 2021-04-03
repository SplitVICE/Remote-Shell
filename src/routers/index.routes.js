const router = require('express').Router();

const controller_router_index = require('../controller/controller.router.index');

// Renders /src/public/index.html
router.get('/', controller_router_index.index);

// Receives requests to execute commands.
router.post('/api/service', controller_router_index.service__post);

module.exports = router;