const app = require('./expressApp');
const routes = require('../routes/api');
app.use('/api/cache', routes);

module.exports = app;
