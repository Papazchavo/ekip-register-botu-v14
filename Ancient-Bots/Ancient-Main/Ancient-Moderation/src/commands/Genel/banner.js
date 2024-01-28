  const { ApplicationCommandOptionType, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
  const axios = require('axios');
  const { DiscordBanners } = require('discord-banners');
  const fetch = require('node-fetch')
  const client = global.bot;


  module.exports = {
    conf: {
      aliases: ["banner","bannercik"],
      name: "banner",
      help: "banner <Ancient/ID>",
      category: "kullanıcı",
    },

  run: async (client, message, args, embed, prefix) => {
    const member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
    const discordBanners = new DiscordBanners(client);
    const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
    if(banner){   
    let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda Aç", style:ButtonStyle.Link, url: banner})]})
    await message.reply({ embeds: [ new EmbedBuilder().setColor("#2b2d31").setImage(`${banner}`)] , components:[Link] })}
      },

    };