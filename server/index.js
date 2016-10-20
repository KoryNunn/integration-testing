/*

    This is an "entire server"

    it is shit

    dont do this.

*/


var http = require('http'),
    seaLion = require('sea-lion'),
    errors = require('generic-errors'),
    requestData = require('request-data'),
    config = require('../config');

// DB, cant you tell?
var db = {
        ids: 0,
        nextId: function(){
            return String(this.ids++);
        },
        owners: {},
        dogs: {}
    };

function getOwner(token, id, callback){
    if(!(id in db.owners)){
        return callback(new errors.NotFound())
    }

    callback(null, db.owners[id]);
}
function getOwners(token, id, callback){
    callback(null, db.owners);
}

function createOwner(data, callback){
    var id = db.nextId();
    data.id = id;
    db.owners[id] = data;
    callback(null, data);
}

function getDog(token, id, callback){
    if(!(id in db.dogs)){
        return callback(new errors.NotFound())
    }

    callback(null, db.dogs[id]);
}
function getDogs(token, id, callback){
    callback(null, db.dogs);
}

function createDog(token, data, callback){
    var id = db.nextId();
    data.id = id;
    db.dogs[id] = data;
    callback(null, data);
}

function endJson(response){
    return function(error, data){
        if(error){
            response.writeHead(error.code || 500);
            response.end(error.message);
            return;
        }

        response.end(JSON.stringify(data));
    };
}

var router = new seaLion({
    '/owners': {
        get: function(request, response, tokens){
            getOwners(request.headers.Authentication, endJson(response));
        },
        post: requestData(function(request, response, tokens, data){
            createOwner(data, endJson(response));
        })
    },
    '/owners/`id`': {
        get: function(request, response, tokens){
            getOwner(request.headers.Authentication, tokens.id, endJson(response));
        }
    },
    '/dogs': {
        get: function(request, response){
            getDogs(request.headers.Authentication, endJson(response));
        },
        post: requestData(function(request, response, tokens, data){
            createDog(request.headers.Authentication, data, endJson(response));
        })
    },
    '/dogs/`id`': {
        get: function(request, response, tokens){
            getDog(request.headers.Authentication, tokens.id, endJson(response));
        }
    }
});

var server = http.createServer(router.createHandler());

var initialised;
module.exports = function(port, callback){
    initialised = true;
    server.listen(port);

    callback();
};

setTimeout(function(){
    if(!initialised){
        module.exports(config.port, dev=>null);
    }
}, 500);