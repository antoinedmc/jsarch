[//]: # ( )
[//]: # (This file is automatically generated by a `metapak`)
[//]: # (module. Do not change it  except between the)
[//]: # (`content:start/end` flags, your changes would)
[//]: # (be overridden.)
[//]: # ( )
# jsarch
> A simple module to extract architecture notes from your code.

[![Build status](https://secure.travis-ci.org/nfroidure/jsarch.svg)](https://travis-ci.org/nfroidure/jsarch)
[![Coverage Status](https://coveralls.io/repos/nfroidure/jsarch/badge.svg?branch=master)](https://coveralls.io/r/nfroidure/jsarch?branch=master)
[![NPM version](https://badge.fury.io/js/jsarch.svg)](https://npmjs.org/package/jsarch)
[![Dependency Status](https://david-dm.org/nfroidure/jsarch.svg)](https://david-dm.org/nfroidure/jsarch)
[![devDependency Status](https://david-dm.org/nfroidure/jsarch/dev-status.svg)](https://david-dm.org/nfroidure/jsarch#info=devDependencies)
[![Dependency Status](https://dependencyci.com/github/nfroidure/jsarch/badge)](https://dependencyci.com/github/nfroidure/jsarch)
[![Package Quality](http://npm.packagequality.com/shield/jsarch.svg)](http://packagequality.com/#?package=jsarch)
[![Code Climate](https://codeclimate.com/github/nfroidure/jsarch.svg)](https://codeclimate.com/github/nfroidure/jsarch)


[//]: # (::contents:start)

## Usage

You may want to generate this project's architecture notes:

```
npm i -g jsarch

git clone git@github.com:nfroidure/jsarch.git

cd jsarch

jsarch **/*.js > ARCHITECTURE.md

```

## Architecture Notes

You can see [this repository architecture notes](./ARCHITECTURE.md) for an
 example of the kind of content generated by this module.


[//]: # (::contents:end)

# API
<a name="initJSArch"></a>

## initJSArch(services) ⇒ <code>Promise.&lt;function()&gt;</code>
Declare jsArch in the dependency injection system

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| services | <code>Object</code> |  | Services (provided by the dependency injector) |
| services.CONFIG | <code>Object</code> |  | The JSArch config |
| services.EOL | <code>Object</code> |  | The OS EOL chars |
| services.glob | <code>Object</code> |  | Globbing service |
| services.fs | <code>Object</code> |  | File system service |
| [services.log] | <code>Object</code> | <code>noop</code> | Logging service |

<a name="initJSArch..jsArch"></a>

### initJSArch~jsArch(options) ⇒ <code>Promise.&lt;String&gt;</code>
Compile an run a template

**Kind**: inner method of [<code>initJSArch</code>](#initJSArch)  
**Returns**: <code>Promise.&lt;String&gt;</code> - Computed architecture notes as a markdown file  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options (destructured) |
| options.cwd | <code>Object</code> | Current working directory |
| options.patterns | <code>Object</code> | Patterns to look files for (see node-glob) |
| options.eol | <code>Object</code> | End of line character (default to the OS one) |
| options.titleLevel | <code>Object</code> | The base title level of the output makdown document |
| options.base | <code>Object</code> | The base directory for the ARCHITECTURE.md references |


# Authors
- [Nicolas Froidure](http://insertafter.com/en/index.html)

# License
[MIT](https://github.com/nfroidure/jsarch/blob/master/LICENSE)
