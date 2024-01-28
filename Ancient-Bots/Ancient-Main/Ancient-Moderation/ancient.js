const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = global.bot = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const discordModals = require('discord-modals');
discordModals(client);
const EmbedBuilder = require('discord.js');
const conf = require("../src/configs/sunucuayar.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
 
const { Database } = require("ark.db");
const ancientdb = (global.ancientsetupxd = new Database("../src/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("../src/configs/emojis.json"));
const allah = require("../../../config.json");

//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Ancient] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[Ancient KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
    console.log(`[Ancient] ${files.length} komut yüklenecek.`);
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(allah.Main.ModerationToken)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


  ///// slash commands
 // const { REST } = require('@discordjs/rest');
  //const { Routes } = require('discord-api-types/v10');  
  //client.slashcommands = new Collection();
  //var slashcommands = [];
  
  //fs.readdirSync('./src/Slashcommands/').forEach(async category => {
	//	const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
	//	for (const command of commands) {
	//	const Command = require(`./src/Slashcommands/${category}/${command}`);
  //  client.slashcommands.set(Command.data.name, Command);
   // slashcommands.push(Command.data.toJSON());
	//	}
	//});
  
	//const rest = new REST({ version: '10' }).setToken(allah.Main.ModerationToken);
  //(async () => {
	//try {
		//console.log('[Ancient] Slash ve Komutlar yükleniyor.');
		//await rest.put(
		//	Routes.applicationGuildCommands(allah.Main.BotClientID, allah.GuildID),
		//	{ body: slashcommands },
	//	).then(() => {
		//	console.log('[Ancient] Slash ve Context Komutlar yüklendi.');
	//	});
//	}
	//catch (e) {
		//console.error(e);
	//}

client.on('interactionCreate', (interaction) => {
if (interaction.type == InteractionType.ApplicationCommand) {
if(interaction.user.bot) return;
try {
const command = client.slashcommands.get(interaction.commandName)
command.execute(interaction, client)
if (!interaction.inGuild() && interaction.isCommand()) return x.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
} catch {
interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
}}
});

const bots = global.allbots = [];
let tkn = []

const xd = [
    allah.Main.ModerationToken,
    allah.Main.RegisterToken,
];
xd.forEach(xxx => 
tkn.push(xxx)
)
tkn.forEach(async (token) => {
  const botClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
      presence: {
          status: "invisible",
          
      },
  });

  botClient.on("ready", async () => {
      bots.push(botClient);
  });

  await botClient.login(token);
});
