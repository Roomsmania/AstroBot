const Command = require('./command')
const YoutubeStream = require('ytdl-core')
module.exports = class Play extends Command {

  static match (message) {
    return message.content.startsWith('!play')
  }

  static action (message) {
    var voiceChannel = message.member.voiceChannel
    if(voiceChannel && voiceChannel.type == 'voice') {
      let args = message.content.split(' ')
      voiceChannel.join()
        .then(function (connection) {
        connection.playFile('./song/welcome_back.wav')
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply('Impossible de lancer cette vidéo')
          connection.disconnect()
        })
        connection
          .playStream(stream)
          .on('end', function () {
          connection.disconnect()
          })
        })
    }
  }
}
