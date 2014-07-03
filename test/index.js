'use strict';

require('should');
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

  it('should pass for comment after selector', function() {
    var code = css2str('html input[type="button"], /* 1 */\ninput[type="reset"] {color:red;}');
    code.should.eql('html input[type="button"],input[type="reset"]{color:red;}');
  });

  it('should support ie hack', function() {
    var code = fs.readFileSync(join(base, 'iehack.css'));
    css2str(code).should.eql('body{_padding:0;*padding:0;padding:0\\\\0;padding:0\\\\0/;padding:0\\\\9;}');
  });
});
