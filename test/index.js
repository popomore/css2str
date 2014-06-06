'use strict';

var should = require('should');
var fs = require('fs');
var join = require('path').join;
var css2str = require('..');

var base = join(__dirname, 'fixtures');

describe('css2str', function() {

  it('should generate string', function() {
    var code = fs.readFileSync(join(base, 'a.css'));
    var expected = fs.readFileSync(join(base, 'a1.expect.css')).toString().slice(0, -1);
    css2str(code).should.eql(expected);
  });

  it('should support string', function() {
    var code = fs.readFileSync(join(base, 'a.css')).toString();
    var expected = fs.readFileSync(join(base, 'a1.expect.css')).toString().slice(0, -1);
    css2str(code).should.eql(expected);
  });

  it('should generate string with prefix', function() {
    var code = fs.readFileSync(join(base, 'a.css'));
    var expected = fs.readFileSync(join(base, 'a2.expect.css')).toString().slice(0, -1);
    css2str(code, {prefix: '.container'}).should.eql(expected);
  });
});
