require("dotenv").config();
// 
var keys = require('./keys.js')
var axios = require('axios')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var moment = require("moment")
var fs = require('fs')
var input = process.argv
var returned = input[2]
var userInput = input.slice(3).join(" ")
var lineBreak = "======================="
// 
function log_entry(data) {
    fs.appendFile('log.txt', data + lineBreak, function (err) {
        if (err) throw err
        console.log('saved')
    })
}
// 
function findSpotify() {
    spotify.search({
        type: 'track',
        query: userInput
    }, function (err, data) {
        if (err) {
            return console.log('err:' + err)
        }
        let addy = '\n' + 'Artist: ' + data.tracks.items[0].artists[0].name + '\n' + "Song Name: " +
            data.tracks.items[0].name + '\n' + "Song Preview: " + data.tracks.items[0].preview_ur +
            '\n' + "Album Title: " + data.tracks.items[0].album.name + '\n';
        console.log(addy)
        log_entry(addy)
    })
}
// 
function concertThis() {
    axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp')
        .then(function (response) {
            let addy2 = '\n' + 'Venue: ' + response.data[0].venue.name + '\n' + 'Location: ' + response.data[0].venue.city +
                response.data[0].venue.region + '\n' + 'Date: ' +
                moment(response.data[0].datetime, "YYYY-MM-DD HH:mm").format("MM/DD/YYYY hh:mm a") + '\n';
            console.log(addy2)
            log_entry(addy2)

        })
}
// 
function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy")
        .then(function (response) {
            let addy3 ='\n' +  'Title: ' + response.data.Title + '\n' + 'Year: ' + response.data.Year + '\n' + 'Rating 1: ' + response.data.imdbRating + 
            '\n' + 'Rating 2: ' + response.data.Ratings[1].Value + '\n' + 'Film Location: ' + response.data.Country + 
            '\n' + 'Lang.: ' + response.data.Language + '\n' + 'Plot: ' + response.data.Plot + '\n' + 'Actors: ' + response.data.Actors + '\n';    
            console.log(addy3)
            log_entry(addy3)
        })
}
// 
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('error!!')
        }
        var split = data.split(',');
        returned = split[0]
        userInput = split[1].split('"').join('')
        check()
    })
}
// 
function check() {
    switch (returned) {
        case "spotify-this-song":
            findSpotify()
            break
        case "concert-this":
            concertThis()
            break
        case "movie-this":
            movieThis()
            break
        case "do-what-it-says":
            doWhatItSays()
            break
        default:
            console.log("err")
            break
    }
}
check()
// 
// end of code