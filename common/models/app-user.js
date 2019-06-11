'use strict';

const validationUtils = require('../utils/validation-utils.js');
// const bcrypt = require('bcryptjs');

module.exports = function(Appuser) {
  Appuser.login = function(name, email, password, callback) {
    const promise = new Promise(function(resolve, reject) {
        if (!email && !validationUtils.validateEmail(email)) {
            return reject({status: 'Enter email'});
          }
        email = ('' + email).trim();

        if (!password) {
            return resolve({status: false, error: 'Enter Password'});
          }
        password = ('' + password).trim();
        if (!name) {
            return resolve({status: false, error: 'Enter Name'});
          }
          name = (''+ name).trim(); 

        Appuser.findOne({
            where: {
                email: email,
                name: name 
            }
        })
        .then((userData)=>{
            if(!userData) {
                return resolve({status: false, error: 'No User found'});
            }

            if( password === userData.password) {
                return resolve({status: true});
            } 
            // else if (comparePassword(password, userData.password)) {
            //     return resolve({status: true});
            // }
             else {
                userData.loginRetryCount += 1;
                userData.save();
                return resolve({status: false, error: 'Wrong username/password'});
            }
        })
        .catch(err=>{
            return resolve({status: false, error: 'Error from database'});
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
      } else {
        return promise;
      }
  };

  Appuser.remoteMethod('login', {
    accepts: [
        {
            arg: 'name',
            type: 'string',
            required: true,
            http: {
                source: 'query',
              },
          },
        {
          arg: 'email',
          type: 'string',
          required: true,
          http: {
              source: 'query',
            },
        },
        {
          arg: 'password',
          type: 'string',
          required: true,
          http: {
              source: 'query',
            },
        },
      ],
    returns: {
        arg: 'data',
        type: 'object',
        root: true,
      },
    http: {
        path: '/login',
        verb: 'POST',
      },
    description: 'API to login, returns user data from database',
  });

//   var comparePassword = function (password, hashedPassword) {
//     password = '' + password; // to handle numeric passwords
//     hashedPassword = '' + hashedPassword;
//     return bcrypt.compareSync(password, hashedPassword);
//   };
};
