var makeRequest = require('make-json-request'),
    config = require('../../../config');

module.exports = {
    create: function(data, callback){
        makeRequest({
            url: config.url + '/owners',
            method: 'POST',
            json: data
        }, callback);
    },
    get: function(token, id, callback){
        makeRequest({
            headers: {
                'Authentication': token
            },
            url: config.url + '/owners/' + id,
            method: 'GET'
        }, callback);
    },
    update: function(token, id, data, callback){
        makeRequest({
            headers: {
                'Authentication': token
            },
            url: config.url + '/owners/' + id,
            method: 'PUT',
            json: data
        }, callback);
    }
};