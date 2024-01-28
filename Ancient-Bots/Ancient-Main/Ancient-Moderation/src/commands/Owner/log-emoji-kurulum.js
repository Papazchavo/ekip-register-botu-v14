const { Database } = require("ark.db");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, ButtonBuilder,StringSelectMenuBuilder,EmbedBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const {istatistik} = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

      const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('rolmenü')
          .setPlaceholder('Kurulum Menüsü Açar')
          .addOptions([
            {
              label: `Kanal Kurulum`,
              description: `Log Kanalarını Kurulum Saglarsın`,
              emoji: istatistik,
              value: "kanal",
            },
            {
              label: `Emoji Kurulum`,
              description: `Emoji Kurulum`,
              emoji: istatistik,
              value: "emoji",
            },
          ]),
      );


      let papaz = new EmbedBuilder()
      .setDescription(`**Kurulum Menüsü Aşagıdaki Menülerden Seçim Yapa bilirsiniz lütfen** \`60 sn\` **seçim yapın yoksa iptal eder**`)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      
      let msg = await message.channel.send({ embeds: [papaz], components : [row],})
       
       var filter = (button) => button.user.id === message.author.id;
       let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })


      collector.on("collect", async (interaction) => {


          if (interaction.values[0] === "kanal") {
          await interaction.deferUpdate();
 
          const parent = await interaction.guild.channels.create({ name: 'Ekip Logları',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            }]
          });
          await interaction.guild.channels.create({ name: 'family_log', 
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'role_log', 
        type: ChannelType.GuildText,
        parent: parent.id
      });
      await interaction.guild.channels.create({ name: 'command_log',
      type: ChannelType.GuildText,
      parent: parent.id
       });
          await interaction.guild.channels.create({ name: 'message_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });

          await interaction.guild.channels.create({ name: 'register_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'name_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
      
   
    await interaction.guild.channels.create({ name: 'fake_Hesap_log',
    type: ChannelType.GuildText,
    parent: parent.id
   });
     
          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

          if (interaction.values[0] === "emoji") {
          await interaction.deferUpdate();
          const emojis = [
            { name: "green", url: "https://cdn.discordapp.com/emojis/835323093265678338.gif?size=80&quality=lossless"},
            { name: "red", url: "https://cdn.discordapp.com/emojis/1104713848780492902.png?size=80&quality=lossless  "},
            { name: "Erkek", url: "https://cdn.discordapp.com/attachments/1092182745033224334/1189547068428132392/859325922289516555.gif?ex=659e8f09&is=658c1a09&hm=31700544893370f74362795c83f7b99c9672586cf1bde060db5f93bb0aa047ae&"},
            { name: "Kadin", url: "https://cdn.discordapp.com/attachments/1092182745033224334/1189547068059025469/849254817889386527.gif?ex=659e8f09&is=658c1a09&hm=6c4c3d6ad84b6f4ae04f28e37a86410a3a5218a01e672e6f6c6a3dad0258323b&"},  
            { name: "cikis", url: "https://cdn.discordapp.com/emojis/1116520122937528420.png?size=80&quality=lossless"},   
            { name: "giris", url: "https://cdn.discordapp.com/emojis/1116520139072999474.png?size=80&quality=lossless"},    
            { name: "istatistik", url: "https://cdn.discordapp.com/emojis/852453245468803132.png?size=80&quality=lossless"},    
            { name: "welcome1", url: "https://cdn.discordapp.com/emojis/1084535921963180155.png?size=80&quality=lossless"},
            { name: "welcome2", url: "https://cdn.discordapp.com/emojis/1104887980696543294.gif?size=80&quality=lossless"}, 
            { name: "welcome3", url: "https://cdn.discordapp.com/emojis/1150128023690018897.gif?size=80&quality=lossless"},
            { name: "welcome4", url: "https://cdn.discordapp.com/emojis/1138508296471466106.png?size=80&quality=lossless"},
            { name: "Hello", url: "https://cdn.discordapp.com/emojis/928882564385615873.gif?size=44&quality=lossless"},
           { name: "Tac", url: "https://cdn.discordapp.com/emojis/928317108461396038.gif?size=44&quality=lossless"},
            
            ]
          const SayıEmojis = [  
            { name: "sifir", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987783613399101/metoa0.gif" },
            { name: "bir", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987148390248519/metoa1.gif" },
            { name: "iki", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987467715203152/metoa2.gif" },
            { name: "uc", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987499130540133/metoa3.gif" },
            { name: "dort", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987551219593256/metoa4.gif" },
            { name: "bes", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987634069688451/metoa5.gif" },
            { name: "alti", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987657343869049/metoa6.gif" },
            { name: "yedi", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987675110953030/metoa7.gif" },
            { name: "sekiz", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987723160887518/metoa8.gif" },
            { name: "dokuz", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987723597086810/metoa9.gif" }
            ]
          emojis.forEach(async (x) => {
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

            SayıEmojis.forEach(async (x) => {
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

        }
  
      })

    }
  },
};