const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const { Database } = require("ark.db");
const ayar = require("../../../../src/configs/sunucuayar.json");
const { red} = require("../../../../src/configs/emojis.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bu komutu sadece Sunucuda kullanabilirsin`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bot developerı olmadığın için kurulumu yapamazsın`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    } else {

    }

    let choose = args[0]

    const row = new ActionRowBuilder()
    .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Sunucu Kurulum Menüsü İçin Tıkla!')
    .addOptions([
      { label: 'Kurulum Menü', description: 'Sunucu İçerisi Kurulum Menüsü.', value: 'help' },
      { label: 'Kontrol Menü', description: 'Sunucuda Kurulmuş Olan Setup Listesi.', value: 'help2' },
    ]),
    );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(!choose) {
    let papaz = new EmbedBuilder()
    .setDescription(`Merhaba ${message.author} Sunucu Kurulumu İçin Aşağıdaki Menüyü Kullan !! Komutun Kullanıldığı Tarih \`${moment(Date.now()).format("LLL")}\` `)
    .setColor("Random")
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.reply({ embeds: [papaz],components: [row] })
    }
    
const filter = i => i.user.id == message.author.id    
let collector = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
collector.on("collect", async (interaction) => {
    
if (interaction.values[0] === "help") {
    const rol1 = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Rol Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setDescription(` 
> **Sunucu Kurulum Menüsü**
\`\`\`fix
!kur tag <Chavo>
!kur tag2 <chavo>
!kur ikinciTag <•>
!kur url <Chavo>
!kur setuptaglıgösterme <tag1,tag2>
\`\`\`
> **Rol Kurulum Menüsü**
\`\`\`fix
!kur Erkek
!kur Kadın 
!kur Kayıtsız 
!kur TaglıRol 
!kur BoosterRol
!kur Teyitci
!kur Sahip 
!kur ŞüpheliRole 
!kur YasaklıRol
\`\`\`
> **Kanal Kurulum Menüsü**
\`\`\`fix
!kur Kurallar
!kur chatkanal 
!kur welcomekanal 
!kur fakeLogChannel
!kur invitekanal 
\`\`\`
`)
message.reply({ embeds: [rol1] })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (interaction.values[0] === "help2") {
const veri1 = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Kontrol Menüsü Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setDescription(` 
> **Kontrol Menüsü**
Bot Owner: (${allah.owners.length > 0 ? `${allah.owners.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Tag: (\` ${ayar.tag ? ayar.tag : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)
Tag2: (\` ${ayar.tag2 ? ayar.tag2 : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)

Tag Gösterme: (\` ${ayar.setuptaglıgösterme > 0 ? ayar.setuptaglıgösterme : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)

Sunucu URL: (${ayar.serverUrl ? ayar.serverUrl : "\`YOK\`"})
Erkek Rol: (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Kadın Rol: (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Kayıtsız Rol: (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Taglı Rol: (${ayar.ekipRolu ? `<@&${ayar.ekipRolu}>` : "\`YOK\`"})
Booster Rol: (${ayar.boosterRolu ? `<@&${ayar.boosterRolu}>` : "\`YOK\`"})
Teyitci Rol: (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sahip Rol: (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yasaklı Tag Rol: (${ayar.yasaklıRole.length > 0 ? `${ayar.yasaklıRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sohbet Kanal: (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
Hoşgeldin Kanal: (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
Davet Kanal: (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
Kurallar Kanal: (${ayar.kurallar.length ? `<#${ayar.kurallar}>` : "\`YOK\`"})
  `)
  
  message.reply({ embeds: [veri1] })
  }



    })
    
//////////////////////////////////////////////////////////////////SETUP TANIMLAMA ELEME SİKİRİM SENİ//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const setup1 = [
{ name: ["tag"], conf: "tag", cmdName: "Tag" },
{ name: ["tag2"], conf: "tag2", cmdName: "Tag2" },
{ name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
{ name: ["setuptaglıgösterme", "setuptaglı", "setuptag", "setuptaglı"], conf: "setuptaglıgösterme", cmdName: "Setup Taglı Gösterme" },
{ name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
    ]
    
    const setup2 = [
{ name: ["erkekrol","manrole","manRoles","manroles","erkek","Erkek"], conf: "erkekRolleri", cmdName: "Erkek Rol(leri)" },
{ name: ["kadınrol","womanrole","womanRoles","womanroles","Kadın","Kadın"], conf: "kizRolleri", cmdName: "Kız Rol(leri)" },
{ name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles","Kayıtsız"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
{ name: ["teyitcirol","teyitcirole","teyitciRole","teyitciRoles","Teyitci"], conf: "teyitciRolleri", cmdName: "Teyitci Rol(leri)" },
{ name: ["sahiprol","sahiprole","sahipRole","sahipRoles","Sahip"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
{ name: ["yasaklı","yasaklıRole","yasaklıRole","yasaklıRoles","YasaklıRol"], conf: "yasaklıRole", cmdName: "Yasaklı Tag Rol" },
{ name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles","ŞüpheliRole"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
    ]
    
    const setup3 = [
{ name: ["taglırol","familyrole","familyRole","familyRoles","TaglıRol"], conf: "ekipRolu", cmdName: "Taglı Rol(leri)" },
{ name: ["boosterrol","boosterrole","boosterRole","boosterRoles","BoosterRol"], conf: "boosterRolu", cmdName: "Booster Rol" },
    ]
    
    const setup4 = [
{ name: ["chat","genelchat","chatChannel","chatchannel","chatkanal"], conf: "chatChannel", cmdName: "Chat Kanal" },
{ name: ["welcome","register","welcomechannel","welcomeChannel","hoşgedlinkanal","welcomekanal","WelcomeKanal"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
{ name: ["invite","invitekanal","inviteChannel","invitechannel","davetkanal","invitekanal"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
{ name: ["fakeLogChannel","fakeLogChannellog","fakeLog","fakelogchannel"], conf: "fakeLogChannel", cmdName: "Fake Log Kanal" },
{ name: ["rules","kurallar","kurallarkanalı","ruleschannel","Kurallar"], conf: "kurallar", cmdName: "Kurallar Kanal" },
    ]
//////////////////////////////////////////////////////////////////SETUP TANIM MENÜSÜ ELEME SİKİRİM//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
setup1.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let select = args[1];
  if (!select) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  global.ancientsetupxd.set(`${x.conf}`, `${select}`)
  message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
};
});

setup2.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
  new RoleSelectMenuBuilder()
  .setCustomId("test")
  .setMaxValues(10)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })

xxx.on("collect", async (interaction) => {
  const rol = interaction.values;
  if(interaction.customId === "test") {
    await interaction.deferUpdate();
    if(rol) {
    let xd = []
    rol.map(x => 
    xd.push(`${x}`)
    )
    global.ancientsetupxd.set(`${x.conf}`, xd)
    msg.edit({ content: `**${x.cmdName}** olarak ${rol.map(x => `<@&${x}>`)} başarıyla eklendi.` , components: [] });
  }
  }
})
};
});

setup3.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
  new RoleSelectMenuBuilder()
  .setCustomId("test2")
  .setMaxValues(1)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })

xxx.on("collect", async (interaction) => {
  const rol = interaction.values[0];
  if(interaction.customId === "test2") {
    await interaction.deferUpdate();
    if(rol) {
    global.ancientsetupxd.set(`${x.conf}`, `${rol}`)
    msg.edit({ content: `**${x.cmdName}** olarak <@&${rol}> başarıyla eklendi.` , components: [] });
  }
  }
})
};
}); 

setup4.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  const selectMenu = new ActionRowBuilder()
  .addComponents([
    new ChannelSelectMenuBuilder()
    .setCustomId("test3")
    .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
    .setMaxValues(1)
  ]);
  
  let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
  
  const filter = i => i.user.id == message.author.id    
  let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })
  
  xxx.on("collect", async (interaction) => {
    const channel = interaction.values[0];
    if(interaction.customId === "test3") {
      await interaction.deferUpdate();
      if(channel) {
      global.ancientsetupxd.set(`${x.conf}`, `${channel}`)
      msg.edit({ content: `**${x.cmdName}** olarak <#${channel}> başarıyla eklendi.` , components: [] });
    }
    }
  })
  };
}); 


    }
  }
  
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


