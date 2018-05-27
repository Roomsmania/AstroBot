const Command = require('./command')
const YoutubeStream = require('ytdl-core')
module.exports = class test extends Command {

  static match (message) {
    return message.content.startsWith('!test')
  }

  static action (client, message) {
    if (!message.guild.voiceConnection) {

                 if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')

                 message.member.voiceChannel.join()
             }

             if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send(':warning: Le bot ne joue pas !');

           let queue = client.fonctions.enqueue(message.guild.id);

             if (queue.length == 0) return message.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
             let text = '';
             for (let i = 0; i < queue.length; i++) {
                 text += `${(i + 1)}. ${queue[i].title} | Ajouté par ${queue[i].requested}\n`
             };
             message.channel.send(":globe_with_meridians: Liste de la file d'attente:\n```" + text + "```");
  }
}
