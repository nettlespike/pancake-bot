const config = require('./config.json'); //we're getting config token from the config.json file
const giverolefun = require('./functions/giveroles.js'); //get the giveroles function
const { Client, Collection, Intents } = require("discord.js"); //discord.js is like a huge library where we can get stuff

const client = new Client({ //configuring our bot
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
});