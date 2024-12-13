"use strict";
require('dotenv').config();
const { app } = require('./app');
app.listen(process.env.PORT || 5000, () => {
    setTimeout(() => {
        console.log(`Resume Analyser Service has started on port ${process.env.PORT || 5000}`)
    }, 0);
});