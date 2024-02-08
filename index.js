const wwa = require('whatsapp-web-api');
const config = require('./config/settings.js');
const client = require('./includes/client.js');

const {
  makeWASocket
} = wwa;

const startServer = (config, client) => {
  return makeWASocket(config, client);
};

startServer(config, client);