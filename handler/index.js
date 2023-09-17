const fs = require("fs")

module.exports = async (client) => {

  const SlashsArray = []

  fs.readdir(`./src`, (error, folder) => {
    folder.forEach(subFolder => {
      fs.readdir(`./src/${subFolder}/`, (error, files) => {
        files.forEach(files => {

          if (!files?.endsWith('.js')) return;
          files = require(`../src/${subFolder}/${files}`);
          if (!files?.name) return;
          client.slashCommands.set(files?.name, files);

          SlashsArray.push(files)
        });
      });
    });
  });

  fs.readdir(`./events/`, (error, folder) => {
    folder.forEach(subFolder => {
      fs.readdir(`./events/${subFolder}/`, (error, files) => {
        files.forEach(arquivo => {
          if (!arquivo.endsWith('.js')) return; require(`../events/${subFolder}/${arquivo}`);
        });
      });
    });
  });

  client.on("ready", async () => {
    client.application.commands.set(SlashsArray)
  });

  process.on('uncaughtException', function (err) {
    console.log('Err ' + err);
  });
};