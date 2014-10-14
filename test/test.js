var validate = require('../js/validate.js');
var assert = require('chai').assert;

describe('Validation of login data', function () {
  describe('Validation of Username', function () {
  	it('should return false if a username is shorter than 4 chars', function (){
      assert.equal(validate.validateUser('abc'), false);
  	});
  	it('should return true if a username is larger than 4 chars', function (){
      assert.equal(validate.validateUser('abcd'), true);
  	});
  	it('should return false if a username is void', function (){
      assert.equal(validate.validateUser(''), false);
  	});
  	it('should return true if username is shorter or equal to 30', function (){
      assert.equal(validate.validateUser('abcdefghijabcdefghijabcdefghij'), true);
  	});
  	it('should return false if a username has no valid chars', function (){
      assert.equal(validate.validateUser('abcd<i>'), false);
  	});
  	it('should return false if a username is larger than 30 chars', function (){
      assert.equal(validate.validateUser('abcdefghijabcdefghijabcdefghija'), false);
  	});
  });
  describe('Validation of Email', function () {
  	it('should admit any kind of name of user for domain',function (){
	  assert.equal(validate.validateEmail('foo@gmail.com'), true);
  	});
  	it('should report error if there was no domain',function (){
      assert.equal(validate.validateEmail('abcd'), false);
  	});
  	it('should admit any kind of name of user for any kind of domain',function (){
	  assert.equal(validate.validateEmail('foo@foo.es'), true);
  	});
  	it('should admit any kind of name of user for any kind of domain',function (){
      assert.equal(validate.validateEmail('foo.foo@baz-foo.foo'), true);
  	});
  	it('should admit any kind of name of user for any kind of domain',function (){
      assert.equal(validate.validateEmail('abcd@abcd.casdce'), true);
  	});
  });
  describe('Validation of Pass', function (){
  	it('should return false if a pass is shorter than 6 chars', function (){
      assert.equal(validate.validatePass('abc'), false);  		
  	});
  	it('should return false if a pass has no valid chars and shorter than 6', function (){
      assert.equal(validate.validatePass('ab*c%'), false);
  	});
  	it('should return false if a pass has no valid chars and larger than 6', function (){
      assert.equal(validate.validatePass('ab*c%c'), false);
  	});
  	it('should return true if pass larger than 6 and with valid chars', function (){
      assert.equal(validate.validatePass('?!^*$0a'), true);
  	});
  	it('should return true if pass equal to 6 and with valid chars', function (){
      assert.equal(validate.validatePass('?!^a*$'), true);
  	});
  	it('should return true if pass equal to 16 and with valid chars', function (){
      assert.equal(validate.validatePass('?!^*$abc09?!^*$a'), true);
  	});
  	it('should return false if pass equal to 16 and with valid chars', function (){
      assert.equal(validate.validatePass('?!^*$abc09?!^*$ab'), false);
  	});
  });
});﻿
