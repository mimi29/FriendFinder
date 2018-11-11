var path = require("path");
var friends = require("../data/friend.js");

module.exports = function(app) {
  // get all friends
  app.get("/api/friends", function(req, res) {
    console.log(friends);
    res.json(friends);
  });

  // Add new friend 
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute match value
		var bestMatchName = '';
		var bestMatchImage = '';
		var totalDifference = 51; // large initial value for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			if (diff < totalDifference) {  // best match if diff value is smaller
        bestMatchName = friends[i].name;
				bestMatchImage = friends[i].photo;
        totalDifference = diff;
			}
		}

		// Add new user
		friends.push(userInput);
		res.json({status: 'OK', matchName: bestMatchName, matchImage: bestMatchImage});
	});

};
