const Discord = require("discord.js")
const config = require("../../../config.json")
module.exports = {
    name: "tag-info",
    aliases: ["taginfo","tagbilgi"],
  execute: async  (client, message, args ,embed , channel) => {
if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Knk Yetkin Yok Kurcalama Ban Yersin"));
const cst = args.slice(0).join(" ")
if(!cst) return message.reply("Bir Tag Belirt!")
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).size

message.reply("Belirtilen Taga Sahip Bu Sunucuda `"+sonuc+"` Kişi Var!")
}}