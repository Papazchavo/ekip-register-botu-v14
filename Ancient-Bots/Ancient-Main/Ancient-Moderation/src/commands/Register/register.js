const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const toplams = require("../../../../src/schemas/toplams");
const allah = require("../../../../../../config.json");
const { red , green, Kadin, Erkek,Hello,Tac,info } = require("../../../../src/configs/emojis.json")
const isimler = require("../../../../src/schemas/names");
const regstats = require("../../../../src/schemas/registerStats");
const otokayit = require("../../../../src/schemas/otokayit");
const moment = require("moment");
moment.locale("tr")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"],
    name: "kayıt",
    help: "kayıt <ID> <Isim>",
    category: "kayıt",
  },
  
run: async (client, message, args, embed, prefix) => { 
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
    if(!uye) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} .kayıt ediceniz kişiyi gidin etiket atın.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Kendini kayıt edemezsin`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Böyle birisini kayıt edemiyorum`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Senden yüksekte olan birisini kayıt edemezsin`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || ""; 
    if(!isim && !yaş) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} .kayıt ediceniz kişiyi gidin etiket atın.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }

    const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.roles.cache.has(ayar.ekipRolu) && !uye.roles.cache.has(ayar.boosterRolu)) return message.reply({ embeds: [embed.setDescription(`**Sunucumuz Şu an da Taglı Alımdadır ${uye.toString()} Üyesinde Tagımız Bulunmadığı İçin Kayıt Yapamam, Kayıt Olmak İçin Tagımızı Alabilir Veya Boost Basarak <@&${ayar.boosterRolu}> Rolüne Sahip Olup Kayıt Olabilirsiniz!!**`)] });
    }


    if(!yaş)  
    { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });
    const pubCategory = message.guild.channels.cache.filter((x) => x.parentId && x.parentId === ayar.publicParents);

    if(ayar.erkekRolleri.some(x => uye.roles.cache.has(x)) || ayar.kizRolleri.some(y => uye.roles.cache.has(y))) {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten kayıtlı durumda eğer'ki bir hata var ise **.kayıtsız @Ancient/ID** ile tekrar kayıt edebilirsiniz`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    
    const row4 = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('kayit')
        .setPlaceholder('Kullanıcının Geçmiş İsimleri:')
        .addOptions([
          {
            label: `İsimler`,
            description: `Kullanıcının Geçmiş İsimleri:`,
            emoji: "1081531806710497340",
            value: "papaz-kayit",
          },
        ]),
    );
    
    const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("MAN")
      .setEmoji(Erkek)
      .setStyle(ButtonStyle.Secondary),
      
    new ButtonBuilder()
      .setCustomId("WOMAN")
      .setEmoji(Kadin)
      .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
      .setCustomId("İPTAL")
      .setEmoji(red)
      .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
      .setCustomId("İSİMLER")
      .setEmoji(Tac)
      .setStyle(ButtonStyle.Secondary)

  );
  
const row2 = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("MAN")
      .setLabel("Kayıt Başarılı")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(green)
      .setDisabled(true),
  );

const row3 = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("MAN")
      .setLabel("Kayıt Başarılı")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(green)
      .setDisabled(true),
  );

    let erkekRol = ayar.erkekRolleri;
    let kadinRol = ayar.kizRolleri;

message.react(green)
let Papaz = new EmbedBuilder()
.setDescription(`
${Tac} ${uye.toString()} üyesinin ismi \`${setName}\` olarak değiştirildi

${Hello} Daha Önce Kayıt Olan.

\`•\` ${data ? data.names.splice(-3).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : "Daha önce kayıt olmamış."}
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

let msg = await message.channel.send({ embeds: [Papaz], components : [ row4, row],})
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 collector.on("collect", async (menu) => {
  if (menu.customId === "kayit") {
    if (menu.values[0] === "papaz-kayit") {
      await menu.deferUpdate();
      const embeds = new EmbedBuilder()
        .setDescription(`${data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` [<t:${Math.floor(x.date / 1000)}:R>] - \` ${x.name} \`  - (${x.rol})`).join("\n") : "Bu kullanıcının isim geçmişi bulunmuyor!"}`)
      menu.followUp({ embeds: [embeds], ephemeral: true })
    }
  }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


collector.on("collect", async (button) => {
  if(button.customId === "İSİMLER") { {
      await button.deferUpdate();
      const embeds = new EmbedBuilder()
        .setDescription(`${data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` [<t:${Math.floor(x.date / 1000)}:R>] - \` ${x.name} \`  - (${x.rol})`).join("\n") : "Bu kullanıcının isim geçmişi bulunmuyor!"}`)
        button.followUp({ embeds: [embeds], ephemeral: true })
    }
  }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

collector.on("collect", async (button) => {

if(button.customId === "MAN") {
  let papaz = new EmbedBuilder()
  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
  .setDescription(`${uye.toString()} **ERKEK** olarak kayıt edildi! ${green} `)

    if (msg) msg.delete();
    button.reply({ embeds: [papaz], components: [row2], ephemeral: false });

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: ayar.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`> ${Erkek} Aramıza Hoşgeldin ${uye} Tagımızı Alarak Bizleri Destekleyebilirsin! `}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

              if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
                setTimeout(() => {
                  uye.voice.setChannel(pubCategory.random()); 
                 uye.send({ content: `Heyy ${uye.toString()} kaydınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - İyi sohbetlerr dilerimm \` ${message.guild.name} \` `}).catch(() => {});
                }, 1000);
              }

   if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
    setTimeout(() => {
     uye.voice.setChannel(pubCategory.random());
     uye.send({ content: `Sevgili ${uye.toString()} başarıyla kaydınız tamamlandığı için teyit kanallarından \`Public Ses Odamıza\` tarafımca çekildiniz. İyi Sohbetler \` ${message.guild.name} \` `}).catch(() => {});
    }, 10000);
  }
  const logEmbed = new EmbedBuilder()
  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
  .setDescription(`${uye.toString()} isimli üye ${message.author} yetkili tarafından Erkek olarak \`${message.guild.name}\` sunucusuna kayıt edildi.`)

if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })

}

if(button.customId === "WOMAN") {

  let papaz = new EmbedBuilder()
  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setDescription(`${uye.toString()} **KADIN** olarak kayıt edildi! ${green}`)

  if (msg) msg.delete();
  button.reply({ embeds: [papaz], components: [row3], ephemeral: false });

    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: ayar.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`> ${Kadin} **Aramıza Hoşgeldin ${uye} Güzelliği Tagımızı Alarak Bizleri Destekleyebilirsin !!**`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

              if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
                setTimeout(() => {
                  uye.voice.setChannel(pubCategory.random());
                 uye.send({ content: `Heyy ${uye.toString()} kaydınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - İyi sohbetlerr dilerimm \` ${message.guild.name} \` `}).catch(() => {});
                }, 1000);
              }




    if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
      setTimeout(() => {
        uye.voice.setChannel(pubCategory.random());
        uye.send({ content: `Sevgili ${uye.toString()} başarıyla kaydınız tamamlandığı için teyit kanallarından \`Public Ses Odamıza\` tarafımca çekildiniz İyi Sohbetler \` ${message.guild.name} \` `}).catch(() => {});
       }, 10000);
      }
      const logEmbed = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${uye.toString()} isimli üye ${message.author} yetkili tarafından Kadın olarak \`${message.guild.name}\` sunucusuna kayıt edildi.`)

    if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })

  }

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi ${green}`, embeds: [], components: [], ephemeral: true});
uye.setNickname(`${ayar.ikinciTag} İsim | Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });
}   
}
