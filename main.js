// import statements
const envior = require("dotenv")
const { Client, Intents, DiscordAPIError } = require('discord.js');
const Discord = require("discord.js")
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ] });
const fs = require("fs");

// prefix used by the bot
const prefix = "!"

// creates a list of commands ending in .js taken from the contents of commands folder 
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// for loop that iterates over commandFiles and sets commands
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// loads .env file contents
envior.config()

// runs once when the bot comes online
client.once("ready", () => {
    console.log("Discord Bot is Online!");
});

// runs continously and detects messages sent by the user
client.on("messageCreate", (message) =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply("there was an error trying to execute that command")
    }
});

// logs onto the discord bot provided by the token in .env file
client.login(process.env.TOKEN)