const functions = require('firebase-functions');
var request = require('request');

const bearer_token = "AAAAAAAAAAAAAAAAAAAAAC%2FY9gAAAAAAnFcdd9x6393qSRl1XfrwReioweU%3DQ73reDyQn22fkob8VqdhDh0YpCpKnSY2AwmlUS8b8D7p9lDHOU";
const bearer = 'Bearer ' + bearer_token;

exports.getUserInfo = functions.https.onRequest((req, res) => {
    const user = req.body.userName;
    request(`https://api.twitter.com/1.1/users/show.json?screen_name=${user}`,{
        method: 'GET',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json',
          'Origin': 'localhost'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //here put what you want to do with the request
            res.send(body);
        }
    })
});


