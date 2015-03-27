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

To run the [envify](https://github.com/hughsk/envify) on [React](https://github.com/facebook/react) to put it into production mode (which in all candor is the sole reason this project exists):

(where `b` is a browserify instance and `env` is the build mode)

``` js
var filterify = require('filterify');
var envify = require('envify/custom');
var isProd = env !== 'dev';

b.transform({ global: true }, filterify({
  filter: '/node_modules/react',
  transform: envify({
    NODE_ENV: isProd ? 'production' : 'development'
  })
}));
```

## CLI Usage

Not yet supported.

