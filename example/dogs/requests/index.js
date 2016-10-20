var makeRequest = require('make-json-request'),
    config = require('../../../config');

module.exports = {
    create: function(token, data, callback){
        makeRequest({
            headers: {
                'Authentication': token
            },
            url: config.url + '/dogs',
            method: 'POST',
            json: data
        }, callback);
    },
    get: function(token, id, callback){
        makeRequest({
            headers: {
                'Authentication': token
            },
            url: config.url + '/dogs/' + id,
            method: 'GET'
        }, callback);
    },
    update: function(token, id, data, callback){
        makeRequest({
            headers: {
                'Authentication': token
            },
            url: config.url + '/dogs/' + id,
            method: 'PUT',
            json: data
        }, callback);
    }
};