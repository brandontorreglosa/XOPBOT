const lineReplyNoMention = require('discord-reply');
const color = process.env.Color;
const db = require("quick.db");
const { MessageButton, MessageActionRow } = require("discord-buttons");
module.exports = {
  name: "beg",
  permissions: ["SEND_MESSAGES"],
  clientpermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  aliases: [],
  cooldown: 15,
  permissions: [],
  description: "beg for coins",
  async execute(client, message, cmd, args, Discord) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const randompercentage = Math.floor(Math.random() * 100) + 1;
    const button1 = new MessageButton()
      .setStyle('green')
      .setID('mon')
      .setLabel`Get ${randompercentage} More Xocoins!`
      .setEmoji("💸")

    const row = new MessageActionRow()
      .addComponent(button1)

    await db.add(`${message.author.username}_begged_total`, 1)
    const totalbegs = await db.get(`${message.author.username}_begged_total`)
    const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**You Begged And Got From XOPBOT \`${randomNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\` Xocoins! 💸**`)
      .setColor(`${color}`)
      .setFooter(`You Have Begged For Over: ${totalbegs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Times!`)
    message.channel.send(embed, row);
    client.add(message.author.id, randomNumber)

    client.on("clickButton", async (button) => {
      if (button.id === "mon") {
        const extrax = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor(`${color}`)
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**You Claimed Extra \`${randompercentage}\` Xocoins! 💸**`)
          .setFooter(`Have A Little More My Friend! 😃`)
        message.lineReplyNoMention(extrax)
      }
      button.reply.defer()
    })
  },
};
