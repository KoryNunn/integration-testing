var righto = require('righto'),
    requests = require('./requests');

// Setup to create a dog
module.exports = function(instance, token, data){
    var ownerId = instance.owners.owner1.get('id');

    return righto(requests.create, ownerId, data);
}