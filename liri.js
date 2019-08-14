require("dotenv").config();

const keys = require("./key.js"); 
const axios = require("axios");
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
const fs = require("fs");
let action = process.argv[2];
let userInput = process.argv.slice(3).join("+");






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
    axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=1`).then( function(res){
        console.log("Artist: " + userInput);    
        let data = res.data;
        // console.log(res.data)
        data.forEach(function(element) {
            let date = new Date(element.datetime);
            let DD = date.getDate();
            let MM = date.getMonth();
            let YYYY = date.getYear();
            console.log("* " + element.venue.name);
            console.log("* " +element.venue.city);
            console.log("* " + MM + "/" + DD + "/" + YYYY);
            console.log("_____________________________");
        });
        
    })
};

function spotifyThisSong(){
    console.log( "Action: spotify-this-song");
    console.log("UserInput: " + userInput);
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
};

function movieThis(){
    if (userInput){
        displayMovie();
    } else{
        userInput = "Mr.Nobody";
        displayMovie();
    }
    function displayMovie(){
        axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`).then(function (res){
            console.log("* "+ res.data.Title);
            console.log("* "+ res.data.Year);
            console.log("* IMDB:"+ res.data.imdbRating);
            console.log("* "+ res.data.Ratings[1].Source + ": " + res.data.Ratings[1].Value);
            console.log("* "+ res.data.Country);
            console.log("* "+ res.data.Language);
            console.log("* "+ res.data.Plot);
            console.log("* "+ res.data.Actors);
            if( userInput === "Mr.Nobody"){
                console.log(`* If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>`)
                console.log("* It's on Netflix!")
            }
            console.log("_____________________________");
        });
    }
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error,data){
        if (error) console.log(error);
        let arr = data.split(",")
        let action = arr[0];
        let input = arr[1];
        console.log("Action:" + action);
        console.log("Input:" + input ) 
    })
};

