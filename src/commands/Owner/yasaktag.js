const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "yasaklı-tag",
  aliases: ["yasaktag"],
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  execute: async (client, message, args, author, channel, guild) => {
     if (!message.member.hasPermission("BAN_MEMBERS")) return channel.send("Komutu kullanabilmek için geçerli yetkin olmalı.");
    if (args[0] === 'ekle') {
        let embed1 = new Discord.MessageEmbed()
            .setColor()
            .setDescription(`Yasaklı tag eklemek için ilk önce bir tag belirtmenn gerek!`)
        if (!args[1]) return message.channel.send(embed1)
        let embed2 = new Discord.MessageEmbed()
            .setColor()
            .setDescription(`Tagın En Fazla 5 Karakter'den Oluşabilir Daha Fazlasına İzin Veremem!`) //Eğer isterseniz ki kendiniz burdan ayarlayabilir siniz ben 1 olarak tercih ettim keyfinize kalmış birşey

        if (args[1].length > 5) return message.channel.send(embed2)
        if (db.has(`yasaklıtag.${message.guild.id}`) && db.get(`yasaklıtag.${message.guild.id}`).includes(args[1])) return message.channel.send(new Discord.MessageEmbed().setColor().setAuthor(`${client.user.username} `, client.user.avatarURL({
            dynamic: true
        })).setDescription(`Bu yasaklı tag zaten eklenmiş.`));
        db.push(`yasaklıtag.${message.guild.id}`, args[1])
        let lol1 = db.fetch(`yasaklıtag.${message.guild.id}`).join("  ,  ")
        let embed3 = new Discord.MessageEmbed()
            .setColor()
            .setDescription(`Yasaklı Taglar arasında ${args[1]} başarıyla eklendi.`)
        return message.channel.send(embed3)

    }
    if (args[0] === 'sıfırla') {
        let embed22 = new Discord.MessageEmbed()
            .setColor()
            .setDescription(`Zaten Bir Yasaklı Tag eklemişsin!`)
        let lol = db.fetch(`yasaklıtag.${message.guild.id}`)
        if (!lol) return message.channel.send(embed22)
        db.delete(`yasaklıtag.${message.guild.id}`)
    }
    if (args[0] === 'liste') {
        var taglar = ""
        let veriler = db.fetch(`yasaklıtag.${message.guild.id}`)
        if (!veriler) return message.channel.send("Herhangi bir tag ayarlanmadı!")

        for (var i = 0; i < veriler.length; i++) {
            taglar += `**${i+1}-)** \`${veriler[i]}\`\n`
        }
        let embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Yasaklı Taglar Kısaca Bunlar.")
            .setDescription(`${taglar}`)
        message.channel.send(embed1)
        if (args[0] === 'logkanalı') {
            if (args[1] == "sıfırla") {
                let taglog = db.fetch(`tagkanal.${message.guild.id}`)
                if (!taglog) return message.channel.send("Log Kanalı Zaten Ayarlı Değil!")
                db.delete(`tagkanal.${message.guild.id}`)
                return message.channel.send(`Tag Log Kanalı başarı ile sıfırladım.`)
            }
            let kanal = message.mentions.channels.first()
            if (!kanal) return message.channel.send("Tag Logu Ayarlamak için lütfen bir kanal etiketleyin.")
            db.set(`tagkanal.${message.guild.id}`, kanal.id)
            message.channel.send(`Tag log kanalı başarı ile ${kanal} olarak ayarlandı`)
        }
        if (args[0] === 'verilecekrol') {
            if (args[1] == "sıfırla") {
                let rol = db.fetch(`tagrol.${message.guild.id}`)
                if (!rol) return message.channel.send("Tag verilecek rolü zaten ayarlı değil.")
                db.delete(`tagrol.${message.guild.id}`)
                return message.channel.send(`Sıfırlandı!`)
            }
            let kanal = message.mentions.roles.first()
            if (!kanal) return message.channel.send("Lütfen Bir Rol Etiketleyin.")
            db.set(`tagrol.${message.guild.id}`, kanal.id)
            message.channel.send(`Tag alındığında verilecek rol ${kanal} olarak ayarlandı`)
        } else {
            let embed1 = new Discord.MessageEmbed()
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`Bir seçenek belirt lütfen! Seçeneklerin : \`ekle/sıfırla/liste/verilecek-rol/logkanal\` `)
            message.channel.send(embed1)
        }


    }
}}