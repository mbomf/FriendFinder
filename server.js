// Dependencies
var express = require("express");
var path = require("path");

// express app and port for heroku
var app = express();
var PORT = process.env.PORT || 3000;

// express app handling data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app"));

// Routes
require("./app/routes/apiRoutes.js")(app);

require("./app/routes/htmlRoutes.js")(app);

// Data
var friends = [
    {
        "name": "Jake",
        "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores": [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    },
    {
        "name": "Adrian",
        "photo": "https://imgc.allpostersimages.com/img/print/posters/walt-disney-mickey-mouse-classic_a-G-9067566-0.jpg",
        "scores": [5, 4, 3, 2, 1, 2, 3, 4, 3, 1]
    }
];

// html routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/app/public/index.html"));
});

app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// API routes
app.get("/api/friends", (req, res) => {
    return res.json(friends);
});
app.post("/api/friends", (req, res) => {
    var newFriend = req.body;
    var bestDifference = 100;
    var bestMatch;
    for (var i = 0; i < friends.length; i++) {
        var toCompare = friends[i].scores;
        var totalDifference = 0;
        for (var k = 0; k < toCompare.length; k++) {
            var a = parseInt(toCompare[k]);
            var b = parseInt(newFriend.scores[k]);
            totalDifference = totalDifference + Math.abs(a - b);
        }
        if (totalDifference < bestDifference) {
            bestDifference = totalDifference;
            bestMatch = friends[i];
        }
    }
    friends.push(newFriend);
    res.json(bestMatch);
})

// start listening
app.listen(PORT, function () {
    console.log("listening on port ", PORT);
});

