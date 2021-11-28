const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });

const allCode = require('./codes.js').varToExport;

const { MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');
client.commands = new Discord.Collection();

const prefix = '-';

let i = 1;

let GUILDS = []

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
        console.log('session created');
    }


    sessions.get(guildId).users = client.users;

    return sessions.get(guildId);
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
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

    if (command === 'setup') {
        let session = getOrCreateSession(message.guildId);
        client.commands.get('setup').execute(message, args, command, session);
    }
});

client.on("interactionCreate", (interaction) => {

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

client.login('OTEyNTI3NDA3NjM2OTcxNTIx.YZxPXw.y20t1RKww02K7MHAZl-4fKiyJAk');
