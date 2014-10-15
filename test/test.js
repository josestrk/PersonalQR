var validate = require('../js/validate.js');
var assert = require('chai').assert;

describe('Validation of login data', function () {
  describe('Validation of Username', function () {
  	it('should return false if a username is void', function (){
      assert.equal(validate.validateUser(''), false);
  	});
  	it('should return false if a username is shorter than 4 chars', function (){
      assert.equal(validate.validateUser('abc'), false);
  	});
  	it('should return true if a username is larger than 4 chars', function (){
      assert.equal(validate.validateUser('abcd'), true);
  	});
  	it('should return true if username is shorter or equal to 30 chars', function (){
      assert.equal(validate.validateUser('abcdefghijabcdefghijabcdefghij'), true);
  	});
  	it('should return false if a username has invalid chars', function (){
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
  	it('should report error if the @ sign is missing',function (){
      assert.equal(validate.validateEmail('abcd.com'), false);
  	});
  	it('should report error if the period is missing',function (){
      assert.equal(validate.validateEmail('abcd@gmail'), false);
  	});
  	it('should admit any kind of name of user for any kind of domain',function (){
	  assert.equal(validate.validateEmail('foo@foo.es'), true);
  	});
  	it('should admit any kind of name of user for any kind of domain',function (){
      assert.equal(validate.validateEmail('foo.foo@baz-foo.foo'), true);
  	});
  	it('should reject an email where the top-level domain has less than 2 characters or more than 4',function (){
      assert.equal(validate.validateEmail('abcd@abcd.a'), true);
	assert.equal(validate.validateEmail('abcd@abcd.abcde'), true);
  	});
  });
  describe('Validation of Pass', function (){
  	it('should return true if a pass has between 6 and 16 characters including at least a lowercase letter, an uppercase letter and a number', function (){
      assert.equal(validate.validatePass('Abc*dEF12'), true);  		
  	});
  	it('should return false if a pass doesn\'t include an uppercase letter', function (){
      assert.equal(validate.validatePass('abc*def12'), false);  		
  	});
  	it('should return false if a pass doesn\'t include a lowercase letter', function (){
      assert.equal(validate.validatePass('ABC*DEF12'), false);  		
  	});
  	it('should return false if a pass doesn\'t include a number', function (){
      assert.equal(validate.validatePass('Abd*dEFgh'), false);  		
  	});
  	it('should return false if a pass is shorter than 6 chars', function (){
      assert.equal(validate.validatePass('Ab1'), false);  		
  	});
  	it('should return false if a pass has invalid characters', function (){
      assert.equal(validate.validatePass('ab*c%c'), false);
  	});
  	it('should return true if pass equal to 6 and with valid chars', function (){
      assert.equal(validate.validatePass('ABcd12'), true);
  	});
  	it('should return true if pass equal to 16 and with valid chars', function (){
      assert.equal(validate.validatePass('Abcdefghij123456'), true);
  	});
  	it('should return false if pass has more than 16 characters', function (){
      assert.equal(validate.validatePass('Abcdefghij1234567'), false);
  	});
  });
});﻿
