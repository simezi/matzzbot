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
