# filterify

Selectively run browserify transforms based on a filter


## Installation

``` bash
npm install filterify
```

## API Usage

filterify exports a function that takes a config argument with two params:

- `transform`: a [browserify](https://github.com/substack/node-browserify) transform
- `filter`: used to decide whether to execute the transform on given file. It can be one of:
  - a function that takes a filename and returns a boolean
  - a string that must occur verbatim in the filename
  - a regex that must match the filename
  - an array of valid filters

It returns a browserify transfom.

### Example usage

To run [envify](https://github.com/hughsk/envify) with different environments for different parts of the project (where `b` is a browserify instance):

``` js
var filterify = require('filterify');
var envify = require('envify/custom');

b.transform(filterify({
  filter: '/prod_mode/',
  transform: envify({
    NODE_ENV: 'production'
  })
}));
b.transform(filterify({
  filter: '/dev_mode/',
  transform: envify({
    NODE_ENV: 'development'
  })
}));
```

## CLI Usage

Not yet supported.

