"use strict";
require('dotenv').config();
const { app } = require('./app');
app.listen(process.env.PORT, () => {
    setTimeout(() => {
        console.log(`Resume Analyser Service has started on port ${process.env.PORT}`)
    }, 0);
});