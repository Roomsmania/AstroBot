const Command = require('./command')
const fonctions = require('../fonctions/fonctions');
const YoutubeStream = require('ytdl-core')
module.exports = class stop extends Command {

  static match (message) {
    return message.content.startsWith('!stop')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
    }
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send(':warning: Le bot ne joue pas !');
    message.guild.voiceConnection.player.dispatcher.end()
    let queue = fonctions.enqueue(message.guild.id);
    message.channel.send(`:white_check_mark: Je me suis bien arrêté`);
    if (queue.length == 0) return;
    for (var i = queue.length - 1; i >= 0; i--) {
      queue.splice(i, 1);
    }
  }
}
