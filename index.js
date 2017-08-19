const Botkit = require('botkit');
const axios = require('axios');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});


controller.hears('hi', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, 'わかる')
});

// say hi
controller.hears(['曲', 'song'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    console.log(message);
    const messages = message.text.split(' ');
    if (messages.length != 2) {
        bot.reply(message, '使い方が間違っている');
    }
    const song = messages[1];
    const url = 'https://imascg-slstage-wiki.gamerch.com/' + encodeURI(song);
    console.log(url);

    axios.get(url).then(res => {
        console.log(res.data);
        if (res.data.includes(song)) {
            bot.reply(message, url);
            return;
        }
        throw new Error();
    }).catch(e => {
        bot.reply(message, 'そんな曲ないよ');
    })
});


const text = `
なあ、お前と飲むときはいつも白○屋だな。
一番最初、お前と飲んだときからそうだったよな。
俺が貧乏浪人生で、お前が月20万稼ぐフリーターだったとき、
おごってもらったのが白木屋だったな。
「俺は、毎晩こういうところで飲み歩いてるぜ。金が余ってしょーがねーから」
お前はそういって笑ってたっけな。

俺が大学出て入社して初任給22万だったとき、
お前は月30万稼ぐんだって胸を張っていたよな。
「毎晩残業で休みもないけど、金がすごいんだ」
「バイトの後輩どもにこうして奢ってやって、言うこと聞かせるんだ」
「社長の息子も、バイトまとめている俺に頭上がらないんだぜ」
そういうことを目を輝かせて語っていたのも、白○屋だったな。

あれから十年たって今、こうして、たまにお前と飲むときもやっぱり白○屋だ。
ここ何年か、こういう安い居酒屋に行くのはお前と一緒のときだけだ。
別に安い店が悪いというわけじゃないが、ここの酒は色付の汚水みたいなもんだ。
油の悪い、不衛生な料理は、毒を食っているような気がしてならない。
なあ、別に女が居る店でなくたっていい。
もう少し金を出せば、こんな残飯でなくって、本物の酒と食べ物を出す店を
いくらでも知っているはずの年齢じゃないのか、俺たちは?
でも、今のお前を見ると、
お前がポケットから取り出すくしゃくしゃの千円札三枚を見ると、
俺はどうしても「もっといい店行こうぜ」って言えなくなるんだ。
お前が前のバイトクビになったの聞いたよ。お前が体壊したのも知ってたよ。
新しく入ったバイト先で、一回りも歳の違う、20代の若いフリーターの中に混じって、
使えない粗大ゴミ扱いされて、それでも必死に卑屈になってバイト続けているのもわかってる。
だけど、もういいだろ。
十年前と同じ白木屋で、十年前と同じ、努力もしない夢を語らないでくれ。
そんなのは、隣の席で浮かれているガキどもだけに許されるなぐさめなんだよ。
 `

controller.hears('コピペ', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, text);
});

