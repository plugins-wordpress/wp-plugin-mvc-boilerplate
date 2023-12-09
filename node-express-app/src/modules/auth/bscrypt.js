var bcrypt = require('bcrypt');

bcrypt.hash('mypassword', 10, function(err, hash) {
    if (err) { throw (err); }

    bcrypt.compare('mypassword', hash, function(err, result) {
        if (err) { throw (err); }
        console.log(result);
    });
});


var bcrypt = require('bcrypt');
var salt = bcrypt.gensaltsync();

bcrypt.hash('mypassword', salt, function(err, hash){
    if(err) throw err;

    bcrypt.compare('mypassword', hash, function(err, result) {
      if (err) { throw (err); }
      console.log(result);
    });

});