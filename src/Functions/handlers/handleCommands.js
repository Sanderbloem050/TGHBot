const { REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() =>{
        const commandFolders = fs.readdirSync('./src/Commands');
        for (const folder of commandFolders){
            const commandFiles = fs
            .readdirSync(`./src/Commands/${folder}`)
            .filter(file => file.endsWith(".js"));

            const{commands, commandArray} = client;
            for(const file of commandFiles){
                const command = require(`../../Commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                //console.log(`Command: ${command.data.name} has passed to the handler `)
            }
        }

        const clientID = '1007626975445254316';
        const guildId = '387284589627965440';
        const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationGuildCommands(clientID, guildId),{
                body: client.commandArray,
            });

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
           console.error(error); 
        }
    };
};