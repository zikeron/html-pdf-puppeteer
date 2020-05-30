const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    env: process.env.ENV,
    port: process.env.PORT,
  },
};
