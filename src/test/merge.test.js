'use strict';
let should = require('should');
let merge = require('../util/merge');

describe('util test', function () {
  it('merge', function (done) {
    let target = merge({}, {name: 'weapon'}, {age: 19});
    should(target.name === 'weapon').be.true;
    should(target.age === 19).be.true;
    done();
  });
});
