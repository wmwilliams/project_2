'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      authenticate: function(email, password, callback) {
        this.find({where: {email: email}}).then(function(user) {

          if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
              if(err) {
                callback(err);
              } else {
                //if result is true pass user obj, otherwise false
                callback(null, result ? user : false);
              }
            });
          }
        })
      }
    },
    hooks: {
      beforeCreate: function(user, option, callback) {
        if(user.password) {
          bcrypt.hash(user.password, 11, function(err, hash) {
            if(err) {
              return callback(err);
            }
            user.password = hash;
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};