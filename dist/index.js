'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _botSdk = require('@line/bot-sdk');

var _botSdk2 = _interopRequireDefault(_botSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
	channelAccessToken: 'SIFQCOIEChz1CPzLZN+f6exWnaBua0p2TA07Xp0IgchO51CHg9zTS15UJAAYB/Vjiv1WrpMXYygCoIqq+IJXDPgQNC5q0P3RimsvNkLUFqVnl0xsUhuuzqxMHNdlgYTB/2zrxctqYdXi0lBweRwOkwdB04t89/1O/w1cDnyilFU=',
	channelSecret: '51e5f7ec68e6f1e348a52674f37cc0f5'
};

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 4000);
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(app.get('port'), function () {
	console.log('running at port ', app.get('port'));
});