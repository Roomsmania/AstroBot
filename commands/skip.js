const Command = require('./command')
const fonctions = require('../fonctions/fonctions');
const YoutubeStream = require('ytdl-core')
module.exports = class Skip extends Command {

  static match (message) {
    return message.content.startsWith('!skip')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
      message.member.voiceChannel.join()
    }
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send(':warning: Le bot ne joue pas !');
    message.guild.voiceConnection.player.dispatcher.end()
    message.channel.send(':fast_forward: Changement de la musique en cours !');

  }
}
