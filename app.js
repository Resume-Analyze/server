const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const app = express();
const routes = require('./routes');

app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(cors());

app.use(session({
	secret: process.env.JWT_SECRET,
	resave: false,
	saveUninitialized: false,
}));

app.use(expressJson({ limit: '5mb' }));


// initialize google auth 
passport.passportInit(app);

app.use(verifyJWT());
if(process.env.RATE_LIMIT_ON_USERID === "true") app.use(userIdBasedlimiter);

app.get('/ping', (req, res, next) => {
	res.status(200).send("pong");
})

// initialize all the routes 
routes.init(app);

// adding Sentry Tracking
app.use(Sentry.Handlers.errorHandler())

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const status = 404;
	const message = 'Not Found';

	const err = new Error(message);
	err.message = message;
	err.status = status;
	err.scope = err.scope || 'Route not found.';

	next(err);
});

app.use((err, req, res, next) => {
	const metadata = {};
	let status = err.status || 800;
	let message = err.message || 'Something went wrong';
	const scope = err.scope || 'expressErrorHandler';

	let { method, url, originalUrl } = req;
	url = (url == '/') ? originalUrl : url;
	metadata.method = method;
	metadata.url = url;

	if (err.name == 'AxiosError') {
		message = err.response?.statusText ? err.response?.statusText : message; //update in all services
		status = err.response?.status ? err.response?.status : err.response?.data?.status ? err.response?.data?.status : status;
		metadata.service = err.response?.data?.data?.service;
		metadata.message = err.response?.data?.message;
	}
	console.error(err);
	if (!res.headersSent) sendResponse(res, status, { service: 'brain', ...err.data }, message);
	handleAppError({ err, scope: scope, metadata, status: status, microServiceName: 'brain' });
});


module.exports = { app };