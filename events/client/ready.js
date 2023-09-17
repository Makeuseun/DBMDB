const client = require('../../app')
const { ActivityType } = require("discord.js")

client.on("ready", () => {
  console.log(`Logged in: ${client.user.tag}`);

  client.user.setStatus('online');
  client.user.setActivity({
    name: '/help',
    type: ActivityType.Listening,
  })    
});