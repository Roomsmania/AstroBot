const Command = require('./command')
const YoutubeStream = require('ytdl-core')
module.exports = class Resume extends Command {

  static match (message) {
    return message.content.startsWith('!resume')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
      message.member.voiceChannel.join()
    }
    if(!message.guild.voiceConnection.player.dispatcher) return message.channel.send(':warning: Le bot n\'a pas reçu l\'ordre de jouer !');
    message.guild.voiceConnection.player.dispatcher.resume()
    message.channel.send(':arrow_forward: Je recommence à rejouer votre musique')
  }
}
