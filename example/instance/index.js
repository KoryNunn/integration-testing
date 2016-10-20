var server = require('../../server'),
    config = require('../../config'),
    righto = require('righto'),
    application = righto(server, config.port);

var owner1Data = {
        name: 'bob down'
    },
    dog1Data = {
        amount: 10
    };

function createOwner(instance, callback){
    var created = require('../owners/create')(instance, owner1Data);

    created(callback);
}

function createDog(instance, callback){
    var owner1YoikId = instance.owners.owner1.get('id');

    var created = require('../dogs/create')(instance, owner1YoikId, dog1Data);

    created(callback);
}

module.exports = function(){

    var instance = {
            owner1Data,
            dog1Data
        };

    instance.application = application;

    instance.owners = {
        owner1: righto(createOwner, instance)
    };

    instance.dogs = {
        dog1: righto(createDog, instance)
    };


    return instance;
};