const config = require('./config.json'); //we're getting config token from the config.json file
const { Client, Collection, Intents } = require("discord.js"); //discord.js is like a huge library where we can get stuff
const PREFIX = config.prefix;
const client = new Client({ //configuring our bot
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

const fs = require("fs"); // to go into different files

client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => { //once the bot runs
    console.log("Connected as " + client.user.tag); //prints to ur console
    console.log(new Date().toLocaleString()); //prints the date to ur console
    client.user.setActivity("Damn brat, I'll chew"); //our activity 
});
  
client.login(config.token);

client.on("messageCreate", (message) => {
    /**
     * Controllable/functions with a prefix
     */
    // splitting up the message by prefix, command, and arguments
    if(message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      // parsing commands
      const [cmd, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        // regex to eliminate extra spaces -> use commas if they're there?
        .split(/\s+/);
      // commands
      if (!client.commands.has(cmd)) return;
      // executing commands dynamically
      try {
        client.commands.get(cmd).execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply({ content: "The command doesn't work :(", ephemeral: true });
      }
    }
    /*
    else { //for listeners
      for (let i = 0; i < listenFiles.length; i++) {
        if (message.author.bot) 
          return;
        client.listener.get(listenFiles[i]).execute(message, client);
      }
    } */   
  });

