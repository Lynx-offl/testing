const { Client } = require("discord.js");
const DB = require("../../Structures/Schemas/LockDown");
/**
 * @param {Client} client
 */
module.exports = async (client) => {
     DB.find().then(async (documentsArray) => {
       documentsArray.forEach((d) => {
            const Channel = client.guilds.cache
            .get(d.GuildID)
            .channels.cache.get(d.channelID);
          if (!Channel) return;

          const TimeNow = Date.now();
       });
     })
}