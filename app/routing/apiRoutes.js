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
		// console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute match value
		var bestMatchName = '';
		var bestMatchImage = '';
		var totalDifference = 51; // large initial value for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);
        bestMatchName = friends[i].name;
				bestMatchImage = friends[i].photo;
        totalDifference = diff;
			}
		}

		// Add new user
		friends.push(userInput);
		// Send appropriate response
		res.json({status: 'OK', matchName: bestMatchName, matchImage: bestMatchImage});
	});

};
