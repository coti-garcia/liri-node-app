require("dotenv").config();

const keys = require("./key.js"); 
const axios = require("axios");
var Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
const fs = require("fs");
let action = process.argv[2];

let userInput = process.argv.slice(3).join("+");

//console.log(userInput);
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(function (res){

// });


fs.readFile("random.txt", "utf8", function(error,data){
    if (error) console.log(error);
    console.log(data)
})


switch (action) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":        
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;    
}

function concertThis(){
    console.log("Action: concert-this");
    console.log("UserInput: " + userInput);
}

function spotifyThisSong(){
    console.log( "Action: spotify-this-song");
    console.log("UserInput: " + userInput);
}

function movieThis(){
    console.log("Action: movie-this");
    console.log("UserInput: " + userInput);
}

function doWhatItSays(){
    console.log("Action: do-what-it-say");
    console.log("UserInput: " + userInput);
}

