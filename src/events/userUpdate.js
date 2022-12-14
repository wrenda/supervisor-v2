const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    let taglıüye = await guild.members.cache.filter(member => member.user.username.includes(config.registration.GuilDTag)).size
    const embed = new MessageEmbed().setTimestamp().setColor('RANDOM').setFooter(`Toplam ${taglıüye} Taglı Üyemiz Var`)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} isminden \`${config.registration.GuilDTag}\` çıkartarak ailemizden ayrıldı!  \n──────────────────────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` \n Sonra ki kullanıcı adı: \`${newUser.tag}\``))
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`${newUser} ismine \`${config.registration.GuilDTag}\` tagımızı alarak ailemize katıldı! Ailemiz ${guild.members.cache.filter(x => x.user.username.includes(config.registration.GuilDTag)).size} kişi oldu! Hoşgeldin`).then(x=>x.delete({timeout: 100000}))
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} ismine \`${config.registration.GuilDTag}\` alarak ailemize katıldı! Aramıza Hoşgeldin \n──────────────────────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\`\n Sonra ki kullanıcı adı: \`${newUser.tag}\``))
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}