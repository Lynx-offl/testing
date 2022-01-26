const { CommandInteraction, MessageEmbed } = require('discord.js');
const { execMap } = require('nodemon/lib/config/defaults');

module.exports = {
     name: "suggest",
     description: "Create a suggestion in an organised matter.",
     options: [
          {
               name: "type",
               description: "Select the type.",
               required: true,
               type: "STRING",
               choices: [
                    {
                         name: "Command",
                         value: "Command"
                    },
                    {
                         name: "Event",
                         value: "Event"
                    },
                    {
                         name: "System",
                         value: "System"
                    },
               ]
          },
          {
               name: "name",
               description: "Provide a name for your suggestion!",
               type: "STRING",
               require: true
          },
          {
               name: "functionality",
               description: "Describe the functionality of this suggestion",
               type: "STRING",
               require: true
          },
     ],

     /**
      * @param {CommandInteraction} interaction
      */
     async execute(interaction) {
          const { options } = interaction;

          const type = options.getString("type");
          const name = options.getString("name");
          const funcs = options.getString("functionality");

          const Response = new MessageEmbed()
          .setColor("AQUA")
          .setDescription(`${interaction.member} has suggested a ${type}.`)
          .addField("Name", `${name}`, true)
          .addField("Functionality", `${funcs}`, true)
          const message = await interaction.reply({embeds: [Response], fetchReply: true})
          message.react("<a:yes:933301322344722452> ")
          message.react("<a:TP_Check_No:933301519741247498>")
     }
}