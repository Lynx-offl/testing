const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
     name: "giveaway",
     description: "A complete advanced giveaway system.",
     permission: "ADMINISTRATOR",
     options: [
          {
               name: "start",
               description: "Start a giveaway.",
               type: "SUB_COMMAND",
               options: [
                    {
                         name: "duration",
                         description: "Provide a duration for this giveaway (1m, 1h, 1d)",
                         type: "STRING",
                         required: true
                    },
                    {
                         name: "winners",
                         description: "Now, Select the amount of winners for this giveaway.",
                         type: "INTEGER",
                         required: true
                    },
                    {
                         name: "prize",
                         description: "Provide the name of the prize", 
                         type: "STRING",
                         required: true
                    },
                    {
                         name: "channel",
                         description: "Select a channel to send the giveaway too.",
                         type: "CHANNEL",
                         channelTypes: ["GUILD_TEXT"]
                    }
               ]
          },
          {
               name: "actions",
               description: "Options for giveaways.",
               type: "SUB_COMMAND",
               options: [
                    {
                         name: "options",
                         description: "Select an option.",
                         type: "STRING",
                         required: true,
                         choices: [
                              {
                                   name: "end",
                                   value: "end"
                              },
                              {
                                   name: "pause",
                                   value: "pause"
                              },
                              {
                                   name: "unpause",
                                   value: "unpause"
                              },
                              {
                                   name: "reroll",
                                   value: "reroll"
                              },
                              {
                                   name: "delete",
                                   value: "delete"
                              },
                         ]
                    },
                    {
                         name: "message-id",
                         description: "Provide the message if of the giveaway.",
                         type: "STRING",
                         required: true
                    }
               ]
          }
 ],
/**
      * 
      * @param {CommandInteraction} interaction
      * @param {Client} client
      */
execute(interaction, client) {
     const { options } = interaction;

     const Sub = options.getSubcommand();

     const errorEmbed  = new MessageEmbed()
     .setColor("RED");

     const successEmbed  = new MessageEmbed()
     .setColor("GREEN");

     switch(Sub) {
          case "start" : {
               const gchannel = options.getChannel("channel") || interaction.channel;
               const duration = options.getString("duration");
               const winnerCount = options.getInteger('winners');
               const prize = options.getString('prize');
       
               client.giveawaysManager.start(gchannel, {
                   duration: ms(duration),
                   winnerCount,
                   prize,
                   messages : {
                        giveaway: "🎉 __GIVEAWAY STARTED__ 🎉'",
                        giveawayEnded: "'👏🏻🎉 __**GIVEAWAY ENDED**__ 🎉👏🏻'",
                        winMessage: 'Congratulations, {winners}! You won **{this.prize}**!'
                   }
               }).then(async ()=> {
                    successEmbed.setDescription("Giveaway was successfully started :D!")
                    return interaction.reply({embeds: [successEmbed], ephemeral: true});
               }).catch((err) => {
                    errorEmbed.setDescription(`An error occurred\n\`${err}\``)
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true});
               });

          }
          break;

          case "actions" : {
               const choice = options.getString("options");
               const messageId = options.getString("message-id");
               const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);
                    
               if (!giveaway){
                    errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this server.`);
                    return interaction.reply({embed: [errorEmbed], ephemeral: true});
               }

               switch(choice) {
                    case "end": {
                           client.giveawaysManager.end(messageId).then(() => {
                           successEmbed.setDescription("Giveaway has been ended!");
                          return interaction.reply({embeds: [successEmbed], ephemeral: true})
                    
                     }).catch((err) => {
                     errorEmbed.setDescription(`An error has occurred\n\`${err}\``);
                     return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                       });

                    }
                    break;
                    case "pause": {
                         client.giveawaysManager.pause(messageId).then(() => {
                         successEmbed.setDescription("Giveaway has been paused!");
                         return interaction.reply({embeds: [successEmbed], ephemeral: true})
                             
                         }).catch((err) => {
                         errorEmbed.setDescription(`An error has occurred\n\`${err}\``);
                         return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                      });
                    }
                    break;
                    case "unpause": {
                          client.giveawaysManager.unpause(messageId).then(() => {
                         successEmbed.setDescription("Giveaway has been unpaused!");
                         return interaction.reply({embeds: [successEmbed], ephemeral: true})
                             
                         }).catch((err) => {
                         errorEmbed.setDescription(`An error has occurred\n\`${err}\``);
                         return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                      });

                    }
                    break;
                    case "reroll": {
                         client.giveawaysManager.reroll(messageId).then(() => {
                           successEmbed.setDescription("Giveaway has been rerolled!");
                           return interaction.reply({embeds: [successEmbed], ephemeral: true})
                                  
                          }).catch((err) => {
                          errorEmbed.setDescription(`An error has occurred\n\`${err}\``);
                          return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                           });

                    }
                    break;
                    case "delete": {
                         client.giveawaysManager.delete(messageId).then(() => {
                         successEmbed.setDescription("Giveaway has been deleted!");
                         return interaction.reply({embeds: [successEmbed], ephemeral: true})
                                  
                         }).catch((err) => {
                          errorEmbed.setDescription(`An error has occurred\n\`${err}\``);
                         return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                           });

                    }
                    break;
               }
          }
          break;

          default : {
               console.log("Error in giveaway command.")
          }
     }
  }
}

