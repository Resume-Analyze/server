const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
app.use(cors());

app.get('/ping', (req, res, next) => {
	res.status(200).send("pong");
})

// initialize all the routes 
routes.init(app);


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
});


module.exports = { app };