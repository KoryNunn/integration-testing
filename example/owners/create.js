var righto = require('righto'),
    requests = require('./requests');

// Setup to create an owner
module.exports = function(instance, data){
    return righto(requests.create, data, righto.after(instance.application));
}