const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  name: "query",
  description: "Perform a data query of movie or series.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "type",
      description: "Select the query type.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Movie",
          value: "filme"
        },
        {
          name: "Series",
          value: "serie"
        }
      ]
    },
    {
      name: "title",
      description: "Type the title of the movie or series.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const type = interaction.options.getString('type');
    const value = interaction.options.getString('title');
    const kaiserAPI = `https://kaiserapi.vercel.app/${type}/${value}`;

    try {
      if (type === 'filme') {
          const response = await axios.get(kaiserAPI);
          const data = response.data;
      
          if (data.Response === 'False') {
            interaction.reply({ content: "Movie not found! Search for the original title.", ephemeral: true });
            return;
          } else {
            const embed = new Discord.EmbedBuilder()
              .setColor('#953553')
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .setTitle(`🔍 MOVIE QUERY 🔍`)
              .setDescription(`
                > __**TITLE**__ - ${data.title}
                > __**RELEASE YEAR**__ - ${data.year}
                > __**RATING**__ - ${data.rated}
                > __**DURATION**__ - ${data.runtime}
                > __**GENRE**__ - ${data.genre}
                > __**DIRECTOR**__ - ${data.director}
                > __**ACTORS**__ - ${data.actors}
                > __**BOX OFFICE**__ - ${data.box_office}
                > __**SYNOPSIS**__ - ${data.plot}
                > __**IMDB RATING**__ - ${data.imdb_rating}
              `)
              .setImage(data.poster)
              .setTimestamp()
              .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
      
            interaction.reply({ embeds: [embed] });
          }

      } else if (type === 'serie') {
          const response = await axios.get(kaiserAPI);
          const data = response.data;
      
          if (data.Response === 'False') {
            interaction.reply({ content: "Series not found! Search for the original title.", ephemeral: true });
            return;
          } else {
            const embed = new Discord.EmbedBuilder()
              .setColor('#953553')
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .setTitle(`🔍 SERIES QUERY 🔍`)
              .setDescription(`
                > __**TITLE**__ - ${data.title}
                > __**DATE**__ - ${data.year}
                > __**RATING**__ - ${data.rated}
                > __**SEASONS**__ - ${data.totalSeasons}
                > __**DURATION**__ - ${data.runtime}
                > __**GENRE**__ - ${data.genre}
                > __**ACTORS**__ - ${data.actors}
                > __**PLOT**__ - ${data.plot}
                > __**IMDB RATING**__ - ${data.imdb_rating}
              `)
              .setImage(data.poster)
              .setTimestamp()
              .setFooter({ text: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
      
            interaction.reply({ embeds: [embed] });
          }
      }
      
    } catch (error) {
      console.error('ERROR: ' + `${error.name} (${error.message})`);
      await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true }).then(m => {
        setTimeout(() => {
          m.delete();
        }, 10000);
      });;
    }
  }
}
