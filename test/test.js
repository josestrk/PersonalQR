//var scoreModel = require('../model/score');
var assert = require('chai').assert;

describe('Validation of login data', function () {
  describe('Validation of User, Email and Pass', function () {
  	it(' should say if a username is valid', function () {
      assert.equal(validateUser('abc'), false);
      assert.equal(validateUser('abcd'), true);
      assert.equal(validateUser(''), false);
      assert.equal(validateUser('abcdefghijklmn'), true);
      assert.equal(validateUser('abcdefghijabcdefghijabcdefghij'), true);
      assert.equal(validateUser('abcdefghijabcdefghijabcdefghija'), false);
    });
    it(' should say if an email is valid', function () {
	  assert.equal(validateEmail('foo@gmail.com'), true);
      assert.equal(validateEmail('abcd'), false);
      assert.equal(validateEmail('foo@foo.es'), true);
      assert.equal(validateEmail('foo.foo@baz-foo.foo'), true);
      assert.equal(validateEmail('abcd@abcd.casdce'), false);
    });
    it(' should say if a pass is valid', function () {
      assert.equal(validatePass('abc'), false);
      assert.equal(validatePass('ab*c%'), false);
      assert.equal(validatePass('ab*c%c'), false);
      assert.equal(validatePass('?!^*$0a'), true);
      assert.equal(validatePass('?!^a*$'), true);
      assert.equal(validatePass('?!^*$abc09?!^*$a'), true);
      assert.equal(validatePass('?!^*$abc09?!^*$ab'), false);
    });
  });
});﻿
