var dotenv = require("dotenv");
dotenv.config({ silent: true });
dotenv.load();

var path = require("path");

require("babel-polyfill");
require("babel-register");

var Bot = require("./src/bot").Bot;
var bot = new Bot(process.env.BOT_TOKEN);
bot.start();
