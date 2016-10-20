var test = require('../test'),
    righto = require('righto'),
    getInstance = require('../instance'),
    requests = require('./requests'),
    createDog = require('./create');

test('dog create', function(t, done){
    t.plan(2);

    var instance = getInstance();

    var data = {
            amount: 10
        };

    var ownerToken = instance.owners.owner1.get('token');

    var createdDog = createDog(instance, ownerToken, data);

    createdDog(function(error, result){

        t.ok(result.id, 'has id');

        delete result.id;

        t.deepEqual(result, {
            amount: 10
        }, 'correct dog data');

        done();
    });
});

test('dog get', function(t, done){
    t.plan(2);

    var instance = getInstance();

    var data = {
            amount: 10
        };

    var ownerToken = instance.owners.owner1.get('token');

    var createdDog = createDog(instance, ownerToken, data),
        createdDogId = createdDog.get('id');

    var retrievedDog = righto(requests.get, ownerToken, createdDogId);

    retrievedDog(function(error, result){
        t.ok(result.id, 'has id');
        delete result.id;

        t.deepEqual(result, {
            amount: 10
        }, 'correct dog data');

        done();
    });
});