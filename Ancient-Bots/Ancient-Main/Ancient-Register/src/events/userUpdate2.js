const { EmbedBuilder, Events } = require("discord.js");
const client = global.bot;
const bannedTag = require("../../../src/schemas/bannedTag");
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const regstats = require("../../../src/schemas/registerStats");
const { star, green, red } = require("../../../src/configs/emojis.json")

module.exports = async (oldMember, newMember) => {
  if (oldMember.bot || newMember.bot || (oldMember.globalName === newMember.globalName)) return;
  const guild = client.guilds.cache.get(allah.GuildID);
  if (!guild) return;
  const member = guild.members.cache.get(oldMember.id);
  if (!member) return;
  const channel = client.channels.cache.find(x => x.name == "family_log");
  const kanal = guild.channels.cache.get(conf.chatChannel)
  if (oldMember.globalName.includes(conf.tag) && !newMember.globalName.includes(conf.tag2)) {
  let ekip = guild.roles.cache.get(conf.ekipRolu);
  let roles = member.roles.cache.clone().filter(e => e.managed || e.rawPosition < ekip.rawPosition);
  let roles2 = member.roles.cache.clone().filter(e => e.managed || e.rawPosition > ekip.rawPosition);

  if (!channel) return;

const tagModedata = await regstats.findOne({ guildID: allah.GuildID })
if (tagModedata && tagModedata.tagMode === true) {
const embed = new EmbedBuilder()
.setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})})
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
 
.setDescription(`
${red} ${member.toString()} isimli eski taglımız, tagımızı <t:${Math.floor(Date.now() / 1000)}:R> bıraktı.
`);
     
channel.wsend({ content: `${member.toString()} [\` ${member.id} \`]`, embeds: [embed]});

if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) return member.roles.set(conf.unregRoles);

} else if (conf.ekipRolu) {
if (member.roles.cache.has(ekip)) member.roles.remove(ekip).catch();
member.roles.set(roles).catch();
}


const embed = new EmbedBuilder()
.setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})})
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
 
.setDescription(`
${red} ${member.toString()} isimli eski taglımız, tagımızı <t:${Math.floor(Date.now() / 1000)}:R> bıraktı.

`);

channel.wsend({ content: `${member.toString()} [\` ${member.id} \`]`, embeds: [embed]});
} else if (!oldMember.globalName.includes(conf.tag2) && newMember.globalName.includes(conf.tag2)){
member.roles.add(conf.ekipRolu);

if (!channel) return;
const embed = new EmbedBuilder()
.setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})})
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
 
.setDescription(`
${green} ${member.toString()} isimli üye ailemize katıldı, tagımızı <t:${Math.floor(Date.now() / 1000)}:R> aldı.
`);
channel.send({ content: `${member.toString()} [\` ${member.id} \`]`, embeds: [embed]});
}
}