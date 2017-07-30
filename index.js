import express from 'express';
import bodyParser from 'body-parser';
import * as line from '@line/bot-sdk';

const config = {
	channelAccessToken: 'SIFQCOIEChz1CPzLZN+f6exWnaBua0p2TA07Xp0IgchO51CHg9zTS15UJAAYB/Vjiv1WrpMXYygCoIqq+IJXDPgQNC5q0P3RimsvNkLUFqVnl0xsUhuuzqxMHNdlgYTB/2zrxctqYdXi0lBweRwOkwdB04t89/1O/w1cDnyilFU=',
	channelSecret: '51e5f7ec68e6f1e348a52674f37cc0f5'
};

const app = express();

app.set('port', (process.env.PORT || 4000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.post('/webhook', line.middleware(config), (req, res) => {
	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	return client.replyMessage(event.replyToken, {
		type: 'text',
		text: event.message.text
	});
}

app.listen(app.get('port'), () => {
	console.log('running at port ', app.get('port'));
});