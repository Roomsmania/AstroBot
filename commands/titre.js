const Command = require('./command')
const fonctions = require('../fonctions/fonctions');
const YoutubeStream = require('ytdl-core')
const Discord = require("discord.js");
module.exports = class titre extends Command {

  static match (message) {
    return message.content.startsWith('!titre')
  }

  static action (message) {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
      message.member.voiceChannel.join()
    }
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send(':warning: Le bot ne joue pas !');
    let queue = fonctions.enqueue(message.guild.id);
    if (queue.length == 0) return message.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
    YoutubeStream.getInfo(queue[0].link, (err, info) =>{
      let embed = new Discord.RichEmbed()
      .setAuthor(queue[0].title)
      .setThumbnail(queue[0].thumbnails)
      .setColor(0xFF0000)
      .addField(":bust_in_silhouette: Auteur", queue[0].channelTitle)
      .addField(":notepad_spiral: Description", (queue[0].description ? queue[0].description : "**Pas de description**"))
      .addField(":date: Date de publication", queue[0].publication)
      .addField(":clock1: Temps", `${Math.floor(message.guild.voiceConnection.player.dispatcher.time / 60000)}:${Math.floor((message.guild.voiceConnection.player.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((message.guild.voiceConnection.player.dispatcher.time % 60000)/1000) : Math.floor((message.guild.voiceConnection.player.dispatcher.time % 60000)/1000)}/${fonctions.time(info.length_seconds)}`, true)
      .addField(':eye: Nombre de vues', info.view_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
      .addField(":link: Lien", queue[0].link)
      .setFooter("demandé par @" + queue[0].requested);
      message.channel.send("**:headphones: Actuellement en joue:**", embed);
    })
  }
}
