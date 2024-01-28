const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField,ComponentType } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const emoji = require("../../../../src/configs/emojis.json")
const { green, red,istatistik } = require("../../../../src/configs/emojis.json")

const moment = require("moment");
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım"],
    name: "yardım",
  },
 
  run: async (client, message, args, embed, prefix) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let command = args[0]
    if (client.commands.has(command)) {
    command = client.commands.get(command)
    message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})) .setDescription(`${green} Belirttiğin komuta ait bilgiler aşağıda verilmiştir`)]})
      return;
    }


    const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('help')
        .setPlaceholder('Yardım Menüsü')
        .addOptions([
          {
            label: `Komutları Görmek İçin Menüye tıkla!`,
            description: `Yardım Menüsü`,
            emoji: istatistik,
            value: "help",
          },
        ]),
    );


    let papaz = new EmbedBuilder()
    .setDescription(`${green} Merhaba ${message.author} Help Komutun Kullanıldığı Tarih \`${moment(Date.now()).format("LLL")}\``)
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    
    let msg = await message.channel.send({ embeds: [papaz], components : [row],})


    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
collector.on("collect", async (interaction) => {
    
if (interaction.values[0] === "help") {
    const rol1 = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Yardım Menüsü`, iconURL : message.guild.iconURL({dynamic : true})})
    .setDescription(` 
> **Botun Komutları**

\`\`\`fix
.av <Ancient/ID> 
.banner <Ancient/ID> 
.zengin 
.isim <@papaz/ID> <Isim> <Yaş> 
.isimler <Ancient/ID> 
.kayitsiz  <papaz/ID> 
.kayıt <ID> <Isim> 
.say 
.özelkomut [ekle, kaldır, liste] 
.kilit 
.sil 
.yasaklıtag [ekle/sil] [tag] / [liste] 
.eval <Code> 
.pm2 
.rolsüz ver 
.kurulum 
.setup 
.taglı-alım
\`\`\` 
`)
message.reply({ embeds: [rol1] })
};
});
}
}
  