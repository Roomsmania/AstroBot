const Discord = require('discord.js')
const Iterate = require('iterate-js')
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true,
})
const Play = require('./commands/play')
const test = require('./commands/test')
const Pause = require('./commands/pause')
const Resume = require('./commands/resume')

var fs = require('fs')

client.commands = new Discord.Collection()

client.on('ready', function (){
  client.user.setAvatar('./astro.png').catch(console.error)
  client.user.setGame('Encore du travail').catch(console.error)
})

client.on('message', function(message) {
  if (message.content === '!ping'){
    message.reply('pong')
  }
})

client.on('message', function (message) {
  let commandUsed =
  Play.parse(message)
  test.parse(message)
  Pause.parse(message)
  Resume.parse(message)
})

client.on('message', function(message) {
  if (message.content === '!leave'){
    var voiceChannel = message.member.voiceChannel
      voiceChannel.leave()
      message.reply('Le bot a quitté le channel vocal')
  }
})

fs.readdir('./fonctions/', (err, files) => {
  if (err) return console.log(err)
  console.log(`Nombre de plugins en chargement ${files.length}`)

  files.forEach((f) => {
    const fonctions = require(`./fonctions/${f}`)
    client[f.split('.')[0]] = fonctions
  })
})

client.login('NDQ3NTExODk2MDkwNzM4Njg4.DeNtTg.YsLlTp-IiOsyvB7BQ4sQUXtYfUM')
module.exports = client;
