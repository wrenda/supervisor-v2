const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "snipe",
    aliases: ["snipe"],
    execute: async (client, message, args) => {
     if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return   message.channel.send("Komutu kullanabilmek için geçerli yetkin olmalı").then(x => x.delete({timeout: 10000}));

    let embed = new MessageEmbed().setColor("#40FC00").setFooter(config.bot.BotStatus);
    let data = db.get(`snipe.${message.guild.id}`);
    if(!data) return message.channel.send(embed.setDescription(`Sunucuda Daha Önce Mesaj Silinmemiş.`)).catch(e => { });
    message.channel.send(embed.setDescription(`
    ${config.emojis.kırmızıok} \`Yazan Kişi:\` <@${data.mesajyazan}>
    ${config.emojis.kırmızıok} \`Mesaj:\` (**${data.mesaj}**)
    ${config.emojis.kırmızıok} \`Yazılma Tarihi:\` ${moment.duration(Date.now() - data.ytarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} **Önce Yazılmış**
    ${config.emojis.kırmızıok} \`Silinme Tarihi:\` ${moment.duration(Date.now() - data.starihi).format("D [gün], H [saat], m [dakika], s [saniye]")} **Önce Silinmiş**
    ${config.emojis.kırmızıok} \`Kanal:\` <#${data.kanal}>
    `)).then(x => x.delete({timeout: 10000}));
        
        }
    }