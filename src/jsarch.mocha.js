'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Knifecycle = require('knifecycle').default;
const initJSArch = require('./jsarch');

describe('jsArch service', () => {
  const logStub = sinon.stub();
  const globStub = sinon.stub();
  const readFileAsyncStub = sinon.stub();
  let $;

  beforeEach(() => {
    $ = new Knifecycle();
    $.constant('EOL', '\n');
    $.constant('log', logStub);
    $.constant('glob', globStub);
    $.constant('fs', { readFileAsync: readFileAsyncStub });
  });

  afterEach(() => {
    logStub.reset();
    globStub.reset();
    readFileAsyncStub.reset();
  });

  it('with no architecture notes', () => {
    initJSArch($);

    globStub.returns(Promise.resolve([
      '/home/me/project/lulz.js',
      '/home/me/project/kikoo.js',
    ]));

    readFileAsyncStub.returns(Promise.resolve(`

console.log('test');

    `));

    return $.run(['jsArch']).then(({ jsArch }) =>
      jsArch({
        patterns: ['**/*.js'],
        base: './blob/master',
        cwd: '/home/me/project',
      })
      .then((content) => {
        assert.deepEqual(readFileAsyncStub.args, [[
          '/home/me/project/lulz.js',
          'utf-8',
        ], [
          '/home/me/project/kikoo.js',
          'utf-8',
        ]]);
        assert.equal(content, '');
      })
    );
  });

  it('with some architecture notes in a file', () => {
    initJSArch($);

    globStub.returns(Promise.resolve([
      '/home/me/project/kikoo.js',
    ]));

    readFileAsyncStub.returns(Promise.resolve(`

/* Architecture Note #1: Title

Some content !
*/

console.log('test');

    `));

    return $.run(['jsArch']).then(({ jsArch }) =>
      jsArch({
        patterns: ['**/*.js'],
        base: './blob/master',
        cwd: '/home/me/project',
      })
      .then((content) => {
        assert.deepEqual(readFileAsyncStub.args, [[
          '/home/me/project/kikoo.js',
          'utf-8',
        ]]);
        assert.equal(content,
`# Architecture Notes



## Title

Some content !

[See in context](./blob/master/kikoo.js#L3-L6)

`
        );
      })
    );
  });

  it('with no architecture notes', () => {
    initJSArch($);

    globStub.returns(Promise.resolve([
      '/home/me/project/lulz.js',
      '/home/me/project/kikoo.js',
    ]));

    readFileAsyncStub.onFirstCall().returns(Promise.resolve(`
/* Architecture Note #1.1: Title 1.1

Some content !
*/

console.log('test');
/* Architecture Note #1: Title 1

Some content !
*/

    `));

    readFileAsyncStub.onSecondCall().returns(Promise.resolve(`
/* Architecture Note #1.3: Title 1.3

Some content !
*/

console.log('test');
/* Architecture Note #2: Title 2

Some content !
*/

    `));

    return $.run(['jsArch']).then(({ jsArch }) =>
      jsArch({
        patterns: ['**/*.js'],
        base: './blob/master',
        cwd: '/home/me/project',
      })
      .then((content) => {
        assert.deepEqual(readFileAsyncStub.args, [[
          '/home/me/project/lulz.js',
          'utf-8',
        ], [
          '/home/me/project/kikoo.js',
          'utf-8',
        ]]);
        assert.equal(content,
`# Architecture Notes



## Title 1

Some content !

[See in context](./blob/master/lulz.js#L8-L11)



### Title 1.1

Some content !

[See in context](./blob/master/lulz.js#L2-L5)



### Title 1.3

Some content !

[See in context](./blob/master/kikoo.js#L2-L5)



## Title 2

Some content !

[See in context](./blob/master/kikoo.js#L8-L11)

`
        );
      })
    );
  });
});
