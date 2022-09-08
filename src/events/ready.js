const config = require("../../config.json");
const db = require("quick.db");
const client = global.client;
const qdb = require("quick.db");
let sunucuayarDB = new qdb.table("sunucuayar");
let rolAyarlarDB = new qdb.table("rolayarlar");

module.exports = () => {
   client.user.setPresence({ activity: { name: (config.bot.BotStatus), type: "PLAYING" }, status: "dnd" });
    const tag = db.get(`bannedtag_${config.Guild.GuildID}`)
    if (tag) {
        setInterval(async () => {
            client.guilds.cache.get(config.Guild.GuildID).members.cache.filter(uye => uye.user.username.includes(tag)).map(async (uye2) => {
                if (uye2.roles.cache.get(config.penals.jail.roles)) return
                await uye2.setNickname((uye2.displayName).replace(tag)).catch(() => { });
                await uye2.roles.add(config.penals.jail.roles).catch(() => { })
            });
        }, 5000)
    }

    setInterval(function () {
        db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
            db.delete(data.ID)
        })
    }, 1000 * 60 * 60 * 5)
    
}

client.guilds.cache.map(async x => {
  client.guilds.cache.get(x.id).members.cache.map(async y => {


  let stats_daily = new qdb.table("stats_daily")
  let stats_week = new qdb.table("stats_week")
  let stats_two_week = new qdb.table("stats_two_week")
  let stats_three_week = new qdb.table("stats_three_week")
  let stats_month = new qdb.table("stats_month")

  let mstats_week = new qdb.table("mstats_week")
  let mstats_daily = new qdb.table("mstats_daily")
  let mstats_two_week = new qdb.table("mstats_two_week")
  let mstats_three_week = new qdb.table("mstats_three_week")
  let mstats_month = new qdb.table("mstats_month")
  setInterval(async () => {
    let sonSifirlanma = await sunucuayarDB.get(`stats_kontrol`);
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 1) {
      await stats_daily.delete(`stats_daily`);
      await mstats_daily.delete(`message_daily`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("Günlük Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 7) {
      await stats_week.delete(`stats_week`);
      await mstats_week.delete(`message_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("1 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 14) {
      await stats_two_week.delete(`stats_two_week`);
      await mstats_two_week.delete(`message_two_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("2 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 21) {
      await stats_three_week.delete(`stats_three_week`);
      await mstats_three_week.delete(`message_three_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("3 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 28) {
      await stats_month.delete(`stats_month`);
      await mstats_month.delete(`message_month`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("Aylık Veriler sıfırlandı")
    }
  }, 1000 * 60 * 10);
if (await sunucuayarDB.get(`stats_kontrol`)) return
console.log("Veri sıfırlama süresi başladı 30 gün sonra sıfırlanacaktır.")
sunucuayarDB.set(`stats_kontrol`, Date.now());
})})

module.exports.conf = {
    name: "ready"
}