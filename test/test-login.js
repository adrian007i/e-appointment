/**
 * Test Login Attempts  
 */
const assert = require('assert').strict;
const isEmpty = require('../server/validation/is-empty.js');

const validateLoginInput = require('../server/validation/login.js');

module.exports = () => {
  // validation of input data on server side
  describe('Login Attempt', function () {
    describe('#Input Validation', function () {

      var temp = {}; // post data to validate
      var data = {}; // return from validation

      it('empty values', function () {
        temp.email = '   ';
        temp.password = '   ';
        data = validateLoginInput(temp);
        assert(!isEmpty(data.errors.password));
        assert(!isEmpty(data.errors.email));
      });
    });
  });
};
