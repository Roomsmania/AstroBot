const Command = require('./command')
const fonctions = require('../fonctions/fonctions');
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true,
})
module.exports = class test extends Command {

  static match (message) {
    return message.content.startsWith('!test')
  }

  static action (message) {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} - HELP`)
    .setThumbnail(client.user.avatarURL)
    .setColor(fonctions.randomColor())
    .setDescription("Nombre de commandes: 6**'\n\n'**Voici la liste des commandes:")
    .setFooter(`AstroBot © BOT crée par Romain#9311`)
    //client.commands.forEach(c => {
    embed.addField('test');
    //});

    message.channel.send(embed);
  }
}
