var validate = require('../js/validate.js');
var assert = require('chai').assert;

describe('Validation of login data', function () {
  describe('Validation of User, Email and Pass', function () {
  	it(' should say if a username is valid', function () {
      assert.equal(validate.validateUser('abc'), false);
      assert.equal(validate.validateUser('abcd'), true);
      assert.equal(validate.validateUser(''), false);
      assert.equal(validate.validateUser('abcdefghijklmn'), true);
      assert.equal(validate.validateUser('abcdefghijabcdefghijabcdefghij'), true);
      assert.equal(validate.validateUser('abcdefghijabcdefghijabcdefghija'), false);
    });
    it(' should say if an email is valid', function () {
	  assert.equal(validate.validateEmail('foo@gmail.com'), true);
      assert.equal(validate.validateEmail('abcd'), false);
      assert.equal(validate.validateEmail('foo@foo.es'), true);
      assert.equal(validate.validateEmail('foo.foo@baz-foo.foo'), true);
      assert.equal(validate.validateEmail('abcd@abcd.casdce'), false);
    });
    it(' should say if a pass is valid', function () {
      assert.equal(validate.validatePass('abc'), false);
      assert.equal(validate.validatePass('ab*c%'), false);
      assert.equal(validate.validatePass('ab*c%c'), false);
      assert.equal(validate.validatePass('?!^*$0a'), true);
      assert.equal(validate.validatePass('?!^a*$'), true);
      assert.equal(validate.validatePass('?!^*$abc09?!^*$a'), true);
      assert.equal(validate.validatePass('?!^*$abc09?!^*$ab'), false);
    });
  });
});﻿
