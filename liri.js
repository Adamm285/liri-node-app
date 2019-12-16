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
// 
function findSpotify() {
    spotify.search({
        type: 'track',
        query: userInput
    }, function (err, data) {
        if (err) {
            return console.log('err:' + err)
        }
        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[i].artists[0].name)
            console.log("Song Name: " + data.tracks.items[i].name)
            console.log("Song Preview: " + data.tracks.items[i].preview_url)
            console.log("Album Title: " + data.tracks.items[i].album.name)
        }
    })
}
// 
function concertThis() {
    axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp')
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log('Venue: ' + response.data[i].venue.name)
                console.log('Location: ' + response.data[i].venue.city, response.data[0].venue.region)
                console.log('Date: ' + moment(response.data[i].datetime, "YYYY-MM-DD HH:mm").format("MM/DD/YYYY hh:mm a"))
            }
        })
}
// 
function movieThis() {
    axios.get('http://www.omdbapi.com/?t=' + userInput + '&apikey=3eb254bb')
        .then(function (response) {
            console.log('Title: ' + response.data.Title)
            console.log('Year: ' + response.data.Year)
            console.log('Rating 1: ' + response.data.imdbRating)
            console.log('Rating 2: ' + response.data.Ratings[1].Value)
            console.log('Film Location: ' + response.data.Country)
            console.log('Lang.: ' + response.data.Language)
            console.log('Plot: ' + response.data.Plot)
            console.log('Actors: ' + response.data.Actors)
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
function check(){
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