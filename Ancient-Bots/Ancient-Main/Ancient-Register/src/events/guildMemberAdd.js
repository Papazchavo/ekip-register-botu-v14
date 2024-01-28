const client = global.bot;
const { Collection } = require("discord.js");
const inviterSchema = require("../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../src/schemas/inviteMember");
const otokayit = require("../../../src/schemas/otokayit");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const moment = require("moment");
const { green, red, welcome1,welcome2,welcome3,welcome4,welcome5,giris ,bann, Hello} = require("../../../src/configs/emojis.json")
const emoji = require("../../../src/configs/emojis.json")

const isimler = require("../../../src/schemas/names");

module.exports = async (member) => {

  
  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(conf.fakeAccRole) member.roles.add(conf.fakeAccRole).catch();
  } else if(conf.unregRoles) member.roles.add(conf.unregRoles).catch();
  if (member.user.username.includes(conf.tag)) { member.setNickname(`${conf.ikinciTag} İsim`).catch(); }
  else { member.setNickname(`${conf.ikinciTag} İsim `).catch();}

  if (member.user.globalName.includes(conf.tag)) {
    client.channels.cache.find(x => x.name == "family_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${conf.tag} sembolü bulunuyor.`})
    await member.roles.add(conf.ekipRolu).catch(e => {e});
    await member.roles.add(conf.unregRoles).catch(e => {e});
  }
  if (member.user.globalName.includes(conf.tag2)) {
    client.channels.cache.find(x => x.name == "family_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${conf.tag2} sembolü bulunuyor.`})
    await member.roles.add(conf.ekipRolu).catch(e => {e});
    await member.roles.add(conf.unregRoles).catch(e => {e});
  }
 

  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

  var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `${emoji.sifir}`,
              '1': `${emoji.bir}`,
              '2': `${emoji.iki}`,
              '3': `${emoji.uc}`,
              '4': `${emoji.dort}`,
              '5': `${emoji.bes}`,
              '6': `${emoji.alti}`,
              '7': `${emoji.yedi}`,
              '8': `${emoji.sekiz}`,
              '9': `${emoji.dokuz}`}[d];
            })
          }     


  const channel = member.guild.channels.cache.get(conf.invLogChannel);
  const kayitchannel = member.guild.channels.cache.get(conf.teyitKanali);
  const fakeChannel = member.guild.channels.cache.get(conf.fakeChannel);
  if (!channel) return;
  if (member.user.bot) return;

  const cachedInvites = client.invites.get(member.guild.id)
  const newInvites = await member.guild.invites.fetch();
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
  client.invites.set(member.guild.id, cachedInvites);

  const res = await bannedTag.findOne({ guildID: allah.GuildID });
  if (!res) return
  
    res.taglar.forEach(async x => {

  if(res.taglar.some(x => member.user.tag.includes(x))) { 
    await member.roles.set(conf.yasaklıRole)
    await member.setNickname("Yasaklı Tag")
    if (allah.Main.dmMessages) member.send({ content:`${member.guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`}).catch(() => {});
}
}) 

if (!usedInvite) {
kayitchannel.wsend({ content:`
${Hello} \`${member.guild.name}\` Sunucumuza Hoş Geldin ${member} Seninle beraber sunucumuz (${üyesayısı}) Kişiyiz 🎉🎉
  
${welcome1} Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş. ${guvenilirlik ? `${red} Şüpheli!` : `${green} Güvenli!` } 

${welcome2} Sunucumuza kayıt olduğunda kurallar kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 
 
${welcome3} kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız 

${welcome4} Sunucu Tagımızı Görmek Ve Almak İçin .tag Yazman Yeterli`});
channel.wsend({ content:`${giris} ${member} <t:${Math.floor(member.joinedAt / 1000)}:R>  sunucuya Özel Davet İle girdi`})
return }  
if (!usedInvite) return;
await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: usedInvite.inviter.id } }, { upsert: true });
if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
fakeChannel.wsend({ content:`${bann} ${member} isimli üye sunucuya katıldı fakat hesabı (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) açıldığı için şüpheli olarak işaretlendi.`});
channel.wsend({ content:`${green} ${member} <t:${Math.floor(member.joinedAt / 1000)}:R> sunucuya **Sunucu Özel URL** ile katıldı. Sunucumuz **${member.guild.memberCount}** Uye sayisina ulaştı.`})
member.roles.set(conf.fakeAccRole)
} else {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`
${Hello} \`${member.guild.name}\` Sunucumuza Hoş Geldin ${member} Seninle beraber sunucumuz (${üyesayısı}) Kişiyiz 🎉🎉
  
${welcome1} Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş. ${guvenilirlik ? `${red} Şüpheli!` : `${green} Güvenli!` } 

${welcome2} Sunucumuza kayıt olduğunda kurallar kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 
 
${welcome3} kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız 

${welcome4} Sunucu Tagımızı Görmek Ve Almak İçin .tag Yazman Yeterli`});
channel.wsend({ content:`${giris} ${member} <t:${Math.floor(member.joinedAt / 1000)}:R>  sunucuya **${usedInvite.inviter.tag}** davetiyle katıldı! Uyenin Davet Sayısı (**${total}**) Sunucumuz **${member.guild.memberCount}** üye sayısına ulaştı!`})
}
};  

module.exports.conf = {
  name: "guildMemberAdd",
};
