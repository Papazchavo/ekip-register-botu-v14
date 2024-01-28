const { ApplicationCommandOptionType,ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

const { setToken } = require("play-dl");

module.exports = {
  conf: {
    aliases: ["av","avatar"],
    name: "av",
    help: "av <Ancient/ID>",
    category: "kullanıcı",
  },

run: async (client, message, args, embed, prefix) => {
if (!message.guild) return;

let member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda Aç", style:ButtonStyle.Link, url: member.displayAvatarURL({dynamic:true})})]})
await message.reply({ embeds: [ new EmbedBuilder().setColor("#2b2d31").setImage(`${member.displayAvatarURL({ dynamic: true, size: 4096 })}`)] , components:[Link] })

   },

};
