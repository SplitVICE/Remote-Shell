const express = require("express");
const app = express();
const path = require('path');
const config_env = require('./config/env');

// Server settings
app.set("port", config_env.PORT);
app.use(express.static(path.join(__dirname, "public"))); // Public files.

// Middlewares
app.use(express.json()); // Server understands JSON on requests.

// Routes
app.use(require("./routers/index.routes"));

module.exports = app;