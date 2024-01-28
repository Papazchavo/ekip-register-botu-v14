const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder ,PermissionsBitField} = require("discord.js");
const allah = require("../../../../../../config.json");
const { red , green } = require("../../../../src/configs/emojis.json")
const registerData  = require("../../../../src/schemas/registerStats");
const ayar = require("../../../../src/configs/sunucuayar.json")
const children = require("child_process");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
        message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Yeterli yetkin yok!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }

    let data = await registerData.findOne({ guildID: allah.GuildID })
    if(!data) new registerData({guildID: allah.GuildID, tagMode: false}).save();

    let ac = new ButtonBuilder()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("915754671728132126");

    let kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("920412153712889877");

    if (data && data.tagMode === true) {
      ac.setStyle(ButtonStyle.Success).setDisabled(true);
    } else {
      ac.setStyle(ButtonStyle.Success);
    }

    if (data && data.tagMode === false) {
      kapa.setStyle(ButtonStyle.Danger).setDisabled(true);
    } else {
      kapa.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let papaz = new EmbedBuilder()  
    .setDescription(`${message.author} Taglı Sistemi Açmak Ve Kapatmak İçin Aşağıdaki Butonları Kullan`)
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Taglı Mod`, iconURL : message.guild.iconURL({dynamic : true})})

  let msg = await message.channel.send({ embeds: [papaz], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: allah.GuildID })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla \`Aktif\` edildi!`, embeds: [], components: [] });
      }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: allah.GuildID })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla \`Kapandı\` edildi!`, embeds: [], components: [] });
    }

  })
}
}
