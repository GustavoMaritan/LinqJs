const distincts = require('./distinct.js'), 
    arrays = require('./array.js'),
    booleans = require('./boolean.js'),
    groupBy = require('./groupBy.js'),
    loops = require('./loop.js'),
    orders = require('./order.js'),
    returnObject = require('./returnObject.js'),
    returnArray = require('./returnArray.js'),
    aggregations = require('./aggregation.js');

module.exports = linqJs();

function linqJs() {
    distincts();
    arrays();
    booleans();
    groupBy();
    loops();
    orders();
    returnObject();
    returnArray();
    aggregations();
}