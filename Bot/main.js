const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });

const { MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');
client.commands = new Discord.Collection();

const prefix = '-';

let i = 1;

let GUILDS = []



const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);

}

const allCodes = require('./codes.js').varToExport;


client.once('ready', () => {
    console.log('Refactor');
});

client.on('messageCreate', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setup'){
        client.commands.get('setup').execute(message,args);
    }
});

client.on("interactionCreate", (interaction) => {

    if (interaction.customId === 'join'){

    }

});

client.login('OTEzNzEzMjYwNDc2MzcwOTkz.YaCfyQ.1-kJgyYpf0ec7ew6PhDS7QEYBAA');