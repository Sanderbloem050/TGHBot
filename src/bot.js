require('dotenv').config();
const {TOKEN} = process.env;
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('fs');

const client = new Client({intents: GatewayIntentBits.Guilds});
client.command = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/Functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./src/Functions/${folder}`)
    .filter(file => file.endsWith('.js'));
    for(const file of functionFiles)
    require(`./Functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(TOKEN);