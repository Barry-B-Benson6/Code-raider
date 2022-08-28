const { REST } = require('@discordjs/rest');
const { channel } = require('diagnostics_channel');
const SlashCommandBuilder = require('discord.js');
const Routes = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });

const allCode = require('./codes.js').varToExport;

const { MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');
const { setgroups } = require('process');
client.commands = new Discord.Collection();

const prefix = '-';
let i = 1;

let GUILDS = []

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


/**
 * Contains information about the current state of a session a particular Guild.
 */
class SessionState {
    constructor(guildId) {
        this.users = Discord.UserManager;
        this.allCodes = allCode;
        this.guildId = guildId;
        this.WarningMessages = [];
        this.inraid = false;
        this.insetup = false;
        this.creator = Discord.User;
        this.currentcode = 0;
        this.playermsgs = [];
        this.Currentplayers = [];
        this.Currentplayerids = [];
        this.Playercodes = [];
        this.deleted = false;
    }
}

const sessions = new Map();

function getOrCreateSession(guildId) {
    if (!sessions.has(guildId)) {
        sessions.set(guildId, new SessionState(guildId));
    }


    sessions.get(guildId).users = client.users;

    return sessions.get(guildId);
}


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}


client.once('ready', () => {
    console.log('Refactor');
    setInterval(() => {
            client.user.setActivity(`/setup to create a raid`);
    }, 2000);

    let commands = client.application?.commands;
    commands?.create({
        name: "setup",
        description: "Starts raid setup",
    })
});

client.on('messageCreate', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setup') {
        console.log(message)
    }
});

client.on("interactionCreate", (interaction) => {
    const {commandName} = interaction
    if (interaction.isCommand){

        if (commandName == "setup"){
            console.log("setup received")
            //interaction.message.delete(1000);
            console.log(client.guilds.cache.get(interaction.guildId))
            let session = getOrCreateSession(interaction.guildId);
            client.commands.get('setup').execute(interaction, client.guilds.cache.get(interaction.guildId).channels.cache.get(interaction.channelId), commandName, session);
            return interaction.deferUpdate;
        }
    }
    if (!interaction.isButton()) return;
    if (interaction.user.bot) return;

    parts = interaction.customId.split('_');
    let customId = parts[0];
    if (parts.length > 1) {
        let guildId = parts[1];

        if (client.commands.has(customId)) {
            let session = getOrCreateSession(guildId);
            console.log("ids" + session.Currentplayerids);
            client.commands.get(customId).execute(interaction, session);

            if (session.deleted) {
                sessions.delete(guildId);
            }
        }
        else {
            console.log('unknown customid: ' + customId);

            interaction.deferUpdate();
        }
    } else {
        console.log('No found guildId in customId: ' + interaction.customId);

        interaction.deferUpdate();
    }

});
client.login(process.env.TOKEN);
