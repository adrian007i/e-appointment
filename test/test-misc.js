/**
 * Test Login Attempts  
 */
const assert = require('assert').strict;
// const isEmpty = require('../validation/is-empty.js');

// const validator = require('validator');

const { validateUserList } = require('../server/validation/profile');

module.exports = () => {

  describe('Misc Tests', function () {
    
    it('Testing is okay', function () {
      assert(true);
    });

    it('validate userlist', function () {
      const data = {
        field: '',
        pageLimit: 33.33
      };
      const newdata = validateUserList(data);
      assert(newdata.field === null && newdata.lastValue === null && newdata.pageLimit === 5);
    });

  });
  
};