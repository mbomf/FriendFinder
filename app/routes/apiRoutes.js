var Friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", (req, res) => {
        return res.json(Friends);
    });

    app.post("/api/friends", (req, res) => {
        var newFriend = req.body;
        var bestDifference = 100;
        var bestMatch;
        for (var i = 0; i < Friends.length; i++) {
            var toCompare = Friends[i].scores;
            var totalDifference = 0;
            for (var k = 0; k < toCompare.length; k++) {
                var a = parseInt(toCompare[k]);
                var b = parseInt(newFriend.scores[k]);
                totalDifference = totalDifference + Math.abs(a - b);
            }
            if (totalDifference < bestDifference) {
                bestDifference = totalDifference;
                bestMatch = Friends[i];
            }
        }
        Friends.push(newFriend);
        res.json(bestMatch);
    });
};
