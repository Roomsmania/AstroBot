const Command = require('./command')
const YoutubeStream = require('ytdl-core')
module.exports = class Pause extends Command {

  static match (message) {
    return message.content.startsWith('!pause')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
      message.member.voiceChannel.join()
    }
    if(!message.guild.voiceConnection.player.dispatcher) return message.channel.send(':warning: Le bot n\'a pas reçu l\'ordre de jouer !');
    message.guild.voiceConnection.player.dispatcher.pause()
    message.channel.send(':pause_button: J\'ai mis votre musique en pause')
  }
}
