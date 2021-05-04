/**
 * Test new User registration 
 */
const assert = require('assert').strict;
const isEmpty = require('../server/validation/is-empty.js');

const validateRegisterInput = require('../server/validation/register.js');

module.exports = () => {
  // validation of input data on server side
  describe('New User Registration', function () {
    describe('#Input Validation', function () {

      var temp = {}; // post data to validate
      var data = {}; // return from validation

      it('empty values', function () {
        temp.username = '';
        temp.email = '';
        temp.password = '';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
        assert(!isEmpty(data.errors.password));
        assert(!isEmpty(data.errors.email));
      });
      it('username too long', function () {
        temp.username = 'aaaaaaaaaabbbbbbbbbbccccccccccd';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
      });
      it('username too short', function () {
        temp.username = 'a';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
      });
      it('password too long', function () {
        temp.password = 'aaaaaaaaaabbbbbbbbbbccccccccccd';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.password));
      });
      it('password too short', function () {
        temp.password = 'aaaaaaa';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.password));
      });
      it('username is empty spaces', function () {
        temp.username = '       ';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
      });
      it('username has special characters', function () {
        temp.username = 'earl_tilluck';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
      });
      it('email is not email addresss ', function () {
        temp.email = 'not@anything';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.email));
      });
      it('username is empty spaces', function () {
        temp.username = '       ';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.username));
      });
      it('password is empty spaces', function () {
        temp.password = '         ';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.password));
      });
      it('email is empty spaces', function () {
        temp.email = '         ';
        data = validateRegisterInput(temp);
        assert(!isEmpty(data.errors.email));
      });
      it('valid data is ok', function () {
        temp.username = 'earltilluck';
        temp.password = 'password1111';
        temp.email = 'earltilluck@domain.com';
        data = validateRegisterInput(temp);
        // console.log(data);
        assert(data.isValid);
      });
    });
  });
};
