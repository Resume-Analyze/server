const resumeRoutes = require('./resumeRoutes');
const init = (app) => {
 
    app.use('/resume', resumeRoutes);
}

module.exports = {
    init
};