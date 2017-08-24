const Botkit = require('botkit');
const axios = require('axios');
const firebase = require('firebase')

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

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: process.env.firebaseApiKey,
    authDomain: "cinderella-c117d.firebaseapp.com",
    databaseURL: "https://cinderella-c117d.firebaseio.com",
    storageBucket: "cinderella-c117d.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

controller.hears('rand', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    database.ref('/songs/').once('value').then(function (songsObj) {
        let songs = []
        songsObj.forEach((song) => {
            songs.push(song.val());
        });
        const rand = parseInt(Math.random() * songs.length)
        console.log(songs[rand])
        bot.reply(message, JSON.stringify(songs[rand]));
    });
});