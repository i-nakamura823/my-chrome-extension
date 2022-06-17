
//console.log("aaaa");

const postTwitter = () => {
	console.log("postTwitter called!");
	require('dotenv').config();
	const Twitter = require('twitter');

	const client = new Twitter({
		consumer_key:'prosess.env.API_KEY',
		consumer_secret: 'prosess.env.API_SECRET_KEY',
		access_token_key: 'prosess.env.ACCESS_TOKEN',
		access_token_secret: 'prosess.env.ACCESS_TOKEN_SECRET'
	});

	var params = {status: 'ツイートtest'};
	client.post('statuses/update', params, function(error, tweets, response){
	if (!error) {
		console.log(tweets);
	} else {
		console.log('error');
	}
	});
}

module.exports = postTwitter;

//postTwitter();