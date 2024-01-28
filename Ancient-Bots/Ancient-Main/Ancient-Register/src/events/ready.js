const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

let guild = client.guilds.cache.get(allah.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(allah.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

      let activities = allah.BotDurum, i = 0;
      setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
        type: ActivityType.Streaming,
        url: "https://www.twitch.tv/ancientcik"}), 10000);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: allah.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: allah.GuildID })
  newData2.save().catch(e => console.log(e))

  

  setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
  setInterval(() => { TagAlıncaKontrol2(); }, 20 * 1000);
  setInterval(() => { TagAlıncaKontrol3(); }, 20 * 1000);
  setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);


async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(allah.GuildID);
let ancient = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
ancient.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};


async function TagAlıncaKontrol() { // Tag alınca tarama
  const guild = client.guilds.cache.get(allah.GuildID)
  const members = [...guild.members.cache.filter(member => member.user.globalName && member.user.globalName.includes(conf.tag) && !member.user.bot && !member.roles.cache.has(conf.yasaklıRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10);
  for await (const member of members) {
  if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
  }
  };

  async function TagAlıncaKontrol2() { // Tag alınca tarama
    const guild = client.guilds.cache.get(allah.GuildID)
    const members = [...guild.members.cache.filter(member => member.user.globalName && member.user.globalName.includes(conf.tag2) && !member.user.bot && !member.roles.cache.has(conf.yasaklıRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10);
    for await (const member of members) {
    if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
    }
    };
    async function TagAlıncaKontrol3() { // Tag alınca tarama
      const guild = client.guilds.cache.get(allah.GuildID)
      const members = [...guild.members.cache.filter(member => member.user.globalName && member.user.globalName.includes(conf.tag3) && !member.user.bot && !member.roles.cache.has(conf.yasaklıRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10);
      for await (const member of members) {
      if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
      }
      };
  



};

module.exports.conf = {
  name: "ready",
};
