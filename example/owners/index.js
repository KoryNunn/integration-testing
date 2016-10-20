var test = require('../test'),
    righto = require('righto'),
    getInstance = require('../instance'),
    requests = require('./requests'),
    createOwner = require('./create');

test('owner create', function(t, done){
    t.plan(2);

    var instance = getInstance();

    var createdOwner = createOwner(instance, instance.owner1Data);

    createdOwner(function(error, result){

        t.ok(result.id, 'has id');

        delete result.id;

        t.deepEqual(result, instance.owner1Data, 'correct owner data');

        done();
    });
});

test('owner get', function(t, done){
    t.plan(2);

    var instance = getInstance();

    var owner1 = instance.owners.owner1,
        owner1Token = owner1.get('token'),
        owner1Id = owner1.get('id');

    var retrievedOwner = righto(requests.get, owner1Token, owner1Id);

    retrievedOwner(function(error, result){
        t.ok(result.id, 'has id');

        delete result.id;

        t.deepEqual(result, instance.owner1Data, 'correct owner data');

        done();
    });
});