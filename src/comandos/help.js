const Discord = require('discord.js');

module.exports = {
  name: "help",
  description: "Show help for the bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
      try {
        const embed = new Discord.EmbedBuilder()
          .setColor('#953553')
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setTitle(`Main Command`)
          .addFields(
            { name: '/query', value: '```Perform a data query of movie or series.```' }
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: false });
      } catch (error) {
        console.log(error);
      }
  }
}