//var scoreModel = require('../model/score');
var assert = require('chai').assert;

describe('User valid test', function () {
  describe('Valid User', function () {

    it(' should say if a username has invalid characters', function () {
      assert.equal(validateUserChars('a/\\bc'), false);
      assert.equal(validateUserChars('ábc'), true);
      assert.equal(validateUserChars('añc'), true);
      assert.equal(validateUserChars('a*b'), false);
      assert.equal(validateUserChars('a\'b'), false);
      assert.equal(validateUserChars('a<>b'), false);
      assert.equal(validateUserChars('abc'), true);
    });
    it(' should say if a username has an appropriate length', function () {
      assert.equal(validateUserLength('abc'), false);
      assert.equal(validateUserLength('abcd'), true);
      assert.equal(validateUserLength(''), false);
      assert.equal(validateUserLength('abcdefghijklmn'), true);
      assert.equal(validateUserLength('abcdefghijabcdefghijabcdefghij'), true);
      assert.equal(validateUserLength('abcdefghijabcdefghijabcdefghija'), false);
    });
    it(' should say if a password has invalid characters', function () {
      assert.equal(validatePasswordChars('abc'), true);
      assert.equal(validatePasswordChars('ab*c%'), true);
      assert.equal(validatePasswordChars('abc'), true);
      assert.equal(validatePasswordChars('abc'), true);
    });
  });
});﻿
