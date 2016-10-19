const arrays = require('./array.js'),
    booleans = require('./boolean.js'),
    groupBy = require('./groupBy.js'),
    loops = require('./loop.js'),
    orders = require('./order.js'),
    returnObject = require('./returnObject.js'),
    aggregations = require('./aggregation.js');

module.exports = linqJs();

function linqJs() {
    arrays();
    booleans();
    groupBy();
    loops();
    orders();
    returnObject();
    aggregations();
}