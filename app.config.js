let allah = require('./config.json');

let botcuk = [
      {
        name: `${allah.GuildName}_Moderation`,
        namespace: `${allah.GuildName}`,
        script: 'ancient.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Ancient-Bots/Ancient-Main/Ancient-Moderation"
      },
      {
        name: `${allah.GuildName}_Voucher`,
        namespace: `${allah.GuildName}`,
        script: 'ancient.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Ancient-Bots/Ancient-Main/Ancient-Register"
      },
    

    ]



  module.exports = {
    apps: botcuk
  };