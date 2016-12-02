/*
var opt = {
    user: gabriele.sammartino,
    pass: asd123,
    auth: {
        authdb: 'gabriele'
    }
};

var connection = mongoose.createConnection(config.database.host, 'mydatabase', config.database.port, opt);
*/

const mongoose = require('mongoose');
mongoose.connect(`mongodb://gabriele.sammartino:asd123@ds113958.mlab.com:13958/gabriele`);

var db = mongoose.connection;
db.on('error', function() {
    console.error('Connection error!')
});
db.once('open', function() {
    console.log('DB connection Ready');
});

var User = require('./models/user');

User.find().remove(function(err) {
  if(err) return console.error('Error deleting all documents!');

  (function() {
    'use strict';
    var names = ['Angelo', 'Marco', 'Daniele', 'Luca', 'Mario', 'Giuseppe', 'Antonio', 'Giovanni', 'Roberto',
    'Maria', 'Giorgia', 'Anna', 'Cristina', 'Amanda', 'Michela', 'Marianna', 'Paola'];
    var ages = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    var surnames = ['Bianchi', 'Rossi', 'Russo', 'Greco', 'Marino', 'Vitale', 'Conti', 'Mancini', 'Romeo'];
    var users = [];
    for(let i = 0; i < 3000; i++) {
      let name = names[i % names.length];
      let surname = surnames[i % surnames.length];
      let age = ages[i % ages.length];
     /* let emails = [];
      if(((i % 7) === 0 || (i % 11) === 5) && surname[surname.lenth - 1] !== 'i') {
          emails = [name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[i % domains.length],
                        name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[(i+1) % domains.length]];
      } else {
          emails = name.toLowerCase() + '.' + surname.toLowerCase() + '@' + domains[i % domains.length];
      }
*/
      let newUserData =  {name: name, surname: surname, age: age, /*email: emails*/};

      if (users.indexOf(newUserData) === -1) {
          users.push(newUserData);
          let newUser = new User(newUserData);
          newUser.save(users, function(err, savedUser) {
              if(err) return console.error('Error saving user: ', err);
              console.log("User Saved!");
          });
      }
    }
    console.log(users.length);
  })();
})
