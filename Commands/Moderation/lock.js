const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/LockDown");
const ms = require("ms")

module.exports = {
     name: "lockdown",
     description: "Lockdown this specific channel.",
     Permission: "MANAGE_CHANNELS",
     options: [
          {
               name: "time",
               description: "Expire date for this lockdown. (1m, 1h, 1d)",
               type: "STRING",
          },
          {
               name: "reason",
               description: "Provide a reason for this lockdown.",
               type: "STRING",
          },
     ],
      /**
      * 
      * @param {CommandInteraction} interaction
      */
     async execute(interaction) {
          const { guild, channel} = interaction;

          const Reason = options.getString("reason") || "no specified reason!";

          const Embed = new MessageEmbed();

          if(!channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
          return interaction.reply({
               embeds: [
                    Embed.setColor('RED').setDescription(
                         "⛔ | This channel is already locked!!."
                    ),
               ],
               ephemeral: true,
          });

          channel.permissionOverwrites.edit(guild.id, {
               SEND_MESSAGES: null,
          })

          interaction.reply({
               embeds: [
                    Embed.setColor("RED").setDescription(
                         `🔐 | This channel is now under lockdown for; ${Reason}`
                    ),
               ],
          });
          const Time = options.getString("time");
          if (Time) {
               const ExpiryDate = Date.now() + ms(Time);
               DB.create({ GuildID: guild.id, ChannelID: channel.id, Time: ExpiryDate });

               setTimeout(async () => {
                    channel.permissionOverwrites.edit(guid.id, {
                         SEND_MESSAGES: null,
                    });
                    interaction.editReply({
                         embeds: [
                              Embed.setDescription(
                                   "🔓 | The lockdown has been lifted"
                              ).setColor("GREEN"),
                         ],
                    })
                    .catch(() => {});
                    await DB.deleteOne({ ChannelID: channel.id });
               }, ms(Time));
          }
     },
};
