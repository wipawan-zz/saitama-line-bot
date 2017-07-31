const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

const config = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET
};

const app = express();

app.set('port', (process.env.PORT || 4000));

app.use(line.middleware(config));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
	if (err instanceof line.SignatureValidationFailed) {
		res.status(401).send(err.signature);
		return;
	} else if (err instanceof JSONParseError) {
		res.status(400).send(err.raw);
		return;
	}
	next(err); //will throw default 500
});

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.post('/webhook', (req, res) => {
	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result))
		.catch(err => {
			console.log(err.message);
		});
});

const client = new line.Client(config);
function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	return client.replyMessage(event.replyToken, {
		type: 'text',
		text: event.message.text
	}).catch(err => {
		console.log(err.statusCode);
	});
}

app.listen(app.get('port'), () => {
	console.log('running at port ', app.get('port'));
});