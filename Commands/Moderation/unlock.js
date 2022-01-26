const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/LockDown");

module.exports = {
     name: "unlock",
     description: "Lifts a Lockdown from a specific channel.",
     Permission: "MANAGE_CHANNELS",
      /**
      * 
      * @param {CommandInteraction} interaction
      */
     async execute(interaction) {
         const { guild, channel, options } = interaction;

         const Embed = new MessageEmbed();

         if (channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
         return interaction.reply({
              embeds: [
                   Embed.setColor("RED").setDescription(
                    "⛔ | This channel is not locked!!."
                   ),
              ],
              ephemeral: true,
         });

         channel.permissionOverwrites.edit(guild.id, {
              SEND_MESSAGES: null,
         });

         await DB.deleteOne({ ChannelID: channel.id });

         interaction.reply({
              embeds: [
                   Embed.setColor("GREEN").setDescription(
                        "🔓 | Lockdown has been lifted."
                   ),
              ],
         });
     },
};