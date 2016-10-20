var test = require('tape'),
    righto = require('righto'),
    debounce = require('debounce'),
    noop = function(){},
    last = righto.sync(noop);

function end(){
    last(function(){
        process.exit();
    });
}

var complete = debounce(end);

module.exports = function(name, options, task){
    if(arguments.length < 3){
        task = options;
        options = null;
    }

    test(name, options, function(t){
        last = righto(function(done){
            t.on('end', done);

            task(t, done);

        }, righto.after(last));

        last(noop);
    });

    complete();
};

module.exports.only = test.only;