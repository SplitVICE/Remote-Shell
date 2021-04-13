// .env content read.
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4500,
    TEST_MODE: process.env.TEST_MODE,
    OPEN_ON_BROWSER_AUTOMATICALLY: process.env.OPEN_ON_BROWSER_AUTOMATICALLY
};