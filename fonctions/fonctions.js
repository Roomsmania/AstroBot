const Discord = require('discord.js');
const client = require('../index.js');
const ytdl = require('ytdl-core');
const {TOKEN, YOUTUBE_API_KEY} = require('./../config')
const fs = require('fs');
var search = require('youtube-search');
var ffmpeg = require("ffmpeg-binaries");
var moment = require("moment");
moment.locale("fr");

var dispatcher;

let queues = {};

const opts = {
    part: 'snippet',
    maxResults: 3,
    key: YOUTUBE_API_KEY
}

const fonctions = {
    enqueue(guild) {
        if (!guild) return;
        if (typeof guild == 'object') guild = guild.id
        if (queues[guild]) return queues[guild]
        else queues[guild] = []
        return queues[guild]
    },

    play(msg, queue, song) {
        try {
            if (!msg || !queue) return;
            if (song) {
                search(song, opts, function(err, results) {
                    //if (err) return msg.channel.send(":x: Video non trouvée ou une erreur s'est produite");
                    song = (song.includes("https://" || "http://")) ? song : results[0].link
                    let stream = ytdl(song, {
                        audioonly: true
                    })
                    let test;
                    if (queue.length === 0) test = true
                    queue.push({
                        "title": results[0].title,
                        "requested": msg.author.username,
                        "toplay": stream,
                        "link": results[0].link,
                        "publication": moment(results[0].publishedAt).format('LLL'),
                        "channelTitle": results[0].channelTitle,
                        "description": results[0].description,
                        "thumbnails": results[0].thumbnails.default.url,
                        "videoId": results[0].id,
                    })
                    msg.channel.send(":satellite_orbital: **Ajout à la queue** - `" + queue[queue.length - 1].title + "`");

                    if (test) {
                        setTimeout(function() {
                            fonctions.play(msg, queue)
                        }, 1000)
                    }
                })
            } else if (queue.length != 0) {

                if (!msg.guild.voiceConnection) return msg.channel.send(":x: Je ne suis pas connecté");

                ytdl.getInfo(queue[0].link, (err, info) =>{
                    console.log(info)
                    let embed = new Discord.RichEmbed()
                    .setAuthor(queue[0].title)
                    .setThumbnail(queue[0].thumbnails)
                    .setColor(0xFF0000)
                    .addField(":bust_in_silhouette: Auteur", queue[0].channelTitle)
                    .addField(":notepad_spiral: Description", (queue[0].description ? queue[0].description : "**Pas de description**"))
                    .addField(":date: Date de publication", queue[0].publication)
                    .addField(":clock1: Durée", fonctions.time(info.length_seconds), true)
                    .addField(':eye: Nombre de vues', info.view_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
                    .addField(":link: Lien", queue[0].link)
                    .setFooter("demandé par @" + queue[0].requested);

                    msg.channel.send("**:headphones: En écoute:**", embed);
                })

                dispatcher = msg.guild.voiceConnection.playStream(queue[0].toplay)

                dispatcher.on('error', () => {
                    queue.shift()
                    fonctions.play(msg, queue)
                })

                dispatcher.on('end', () => {
                    setTimeout(() => {
                        if (queue.length > 0) {
                            queue.shift()
                            fonctions.play(msg, queue)
                        }
                    }, 1000)
                })

            } else {
                msg.channel.send(":warning: Il n'y a plus **aucunes** musiques dans la queue !")

            }
        } catch (err) {
            if(err) return console.log(`[Erreur] ${err}`)
        }
    },
    randomColor() {

        const colors = [0xED0505, 0xEDE605, 0x05ED52, 0x05AFED, 0xE605ED, 0xED0543, 0xC5C6C5, 0x111311];

        return colors[Math.floor(Math.random() * colors.length)];
    },

    time(temps){
        let retour = "";
        if (temps<60) {
            retour = `${temps}s`;
        } else if (temps<3600) {
            retour = `${Math.floor(temps/60)}:${temps%60}`;
        } else if (temps<86400) {
            retour = `${Math.floor(temps/3600)}:${Math.floor(temps%3600/60)}:${temps%3600%60}`;
        } else if (temps<604800) {
            retour = `${Math.floor(temps/86400)}:${Math.floor(temps%86400/3600)}:${Math.floor(temps%86400%3600/60)}:${temps%86400%3600%60}`;
        }
        return retour;
    },
}

module.exports = fonctions;
