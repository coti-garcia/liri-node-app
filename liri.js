require("dotenv").config();

const keys = require("./key.js"); 
const axios = require("axios");
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
const fs = require("fs");
let action = process.argv[2];
let userInput = process.argv.slice(3).join("+");
let query = process.argv.slice(3).join(" ");

switch (action) {
        case "concert-this":
            return concertThis(userInput);
        case "spotify-this-song":
            return spotifyThisSong(query);
            break;
        case "movie-this":        
            return movieThis(userInput);
        case "do-what-it-says":
            return doWhatItSays();   
}


function concertThis(userInput){
    axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=1`).then( function(res){
        // console.log("Artist: " + userInput);    
        let data = res.data;
        // console.log(res.data)
        data.forEach(function(element) {
            let date = new Date(element.datetime);
            let DD = date.getDate();
            let MM = date.getMonth();
            let YYYY = date.getYear();
            console.log(`
             * ${element.venue.name}
             * ${element.venue.city}
             * ${MM}/${DD}/${YYYY}
            `)
        });
        
    })
};

function spotifyThisSong(query){
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        let artistName = data.tracks.items[0].artists[0].name;
        let songName = data.tracks.items[0].name;
        let previewLink = data.tracks.items[0].preview_url;
        let album = data.tracks.items[0].album.name;

        console.log(`
        * Artist: ${artistName}
        * Album: ${album}
        * Song Name: ${songName}
        * Preview Link: ${previewLink}
        `);
    })
};

function movieThis(userInput){
    if (userInput){
        displayMovie();
    } else{
        userInput = "Mr.Nobody";
        displayMovie();
    }
    function displayMovie(){
        axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`).then(function (res){
            console.log(`
             * ${res.data.Title}
             * ${res.data.Year}
             * IMDB: ${res.data.imdbRating}
             * ${res.data.Ratings[1].Source}: ${res.data.Ratings[1].Value}
             * ${res.data.Country}
             * ${res.data.Language}
             * ${res.data.Plot}
             * ${res.data.Actors}
            `)

            if( userInput === "Mr.Nobody"){
                console.log(`
             * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
             * It's on Netflix!
                `)
            }
        });
    }
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error,data){
        if (error) console.log(error);
        let arr = data.split(",")
        let action = arr[0];
        let input = arr[1];
        let query = input.replace(/"/g,"")
        let userInput = query.replace(" ","+")
       
        switch (action) {
            case "concert-this":
                return concertThis(userInput);
            case "spotify-this-song":
                return spotifyThisSong(query);
                break;
            case "movie-this":        
                return movieThis(userInput);
        }
    })
};

