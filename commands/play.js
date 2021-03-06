const Command = require('./command')
const fonctions = require('../fonctions/fonctions');
const YoutubeStream = require('ytdl-core')
module.exports = class Play extends Command {

  static match (message) {
    return message.content.startsWith('!play')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
      message.member.voiceChannel.join()
    }
    let args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send(':warning Veuillez spécifier votre musique !')
    fonctions.play(message, fonctions.enqueue(message.guild.id), args)
  }
}
