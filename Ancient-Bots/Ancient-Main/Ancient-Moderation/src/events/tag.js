const conf = require("../../../src/configs/sunucuayar.json")
const { green } = require("../../../src/configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === ".tag" || message.content.toLowerCase() === "TAG") {
    message.react(green);
    message.reply(conf.setuptaglıgösterme);
  }
};
module.exports.conf = {
  name: "messageCreate"
};