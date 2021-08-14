const app = require('./expressApp');
import schedulingService from '../app/services/schedulingService';
const server = require('http').Server(app);
schedulingService.schedulingCommands();
require('./routes');

module.exports = server;
