const { IntentsBitField } = require('discord.js')
const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client({ 
    intents: [ 
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.GuildMembers,
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ]
});

module.exports = client;

client.on('interactionCreate', (interaction) => {
      
  if(interaction.type === Discord.InteractionType.ApplicationCommand){      
    const cmd = client.slashCommands.get(interaction.commandName);      
    if (!cmd) return interaction.reply(`This command does not exist.`);      
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);      
    cmd.run(client, interaction)      
  }
}); 
      
client.slashCommands = new Discord.Collection()
require('./handler/index.js')(client)

client.login(config.TOKEN);

/*
##################################################
#         Discord Bot Movie Database v14         #  
#       https://github.com/Makeuseun/DBMDB       #
##################################################
*/