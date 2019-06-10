'use strict';

module.exports = {
  validateEmail: function (email) {
    /*eslint-disable */
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*eslint-enable */
    return re.test(email);
  },

  checkIfEmpty: function (str) {
    str = '' + str;
    if (str == null || str == undefined || str == '') {
      return false;
    } else {
      return true;
    }
  },

  validatePassword: function (password) {
    /*eslint-disable */
    const re = /^(?![\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w])([^\s]){8,}$/;
    /*eslint-enable */
    return re.test(password);
  }

};
