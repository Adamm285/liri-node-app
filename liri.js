require("dotenv").config();
// 
var keys = require('./keys.js')
var axios = require('axiois')
var Spotify = require('node-spotiy-api')
var spotify = new Spotify(keys.spotify)
var moment = require("moment")
var fs = require('fs')
var input = process.argv
var info = input[2]
var userInput = input.slice(3).join(" ")
// 
function findSpotify(){
    spotify.search({ type: 'track', query: userInput}, function(err, data){
        if (err){
            return console.log('err:' + err); 
        }
        for (let j = 0; j < userInput.data.length; j++) {
            console.log('Artist: ' + data.track.items[i].artist[0].name)
            console.log('Song: ' + data.track.items[i].name)
            console.log('Preview: ' + data.track.items[i].preview_url)
            console.log('Album: ' + data.track.items[i].album.name)
        }
    })
}
// 
function concertThis(){
    axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp')
    .then(function(response){
        for (let i = 0; i < response.data.length; i++) {
            console.log('Venue: ' + response.data[i].venue.name)
            console.log('Location: ' + response.data[i].venue.city, response...)
            console.log('Date: ' + response.data[i].datetime, "YYY-MM-DD")
        }
    })
}
// 
function movieThis(){
    axios.get("http:///www.omdbapi.com/?i=tt3896198&apikey=761dff93")
    .then(function (response){
        
        for (let index = 0; index < array.length; index++) {
            console.log('Title: ' + response.data.Title)
            console.log('Year: ' + response.data.Year)
            console.log('Rating 1: ' + response.data.imdbRating)
            console.log('Rating 2: ' + response.data.Rating[1].Value)
            console.log('Film Location: ' + response.data.Country)
            console.log('Lang.: ' + response.data.Language)
            console.log('Plot: ' + response.data.Plot)
            console.log('Actors: ' + response.data.Actors)
        }
    })
}
// 
switch (returned){
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
}
