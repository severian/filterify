var through = require('through2');

module.exports = function(config) {
  var test = (function makeTest(filter) {
    if (typeof filter === 'function') {
      return filter;
    } else if (typeof filter === 'string') {
      return function(file) {
        return file.indexOf(filter) !== -1;
      };
    } else if (filter instanceof RegExp) {
      return function(file) {
        return filter.test(file);
      };
    } else if (Array.isArray(filter)) {
      var tests = filter.map(makeTest);
      return function(file) {
        return tests.some(function(f) { return f(file); })
      };
    } else {
      throw 'config.test must be a function, string, regex, or an array of valid tests';
    }
  })(config.filter);

  if (typeof config.transform !== 'function') {
    throw 'config.transform must be a browserify transform';
  }

  return function(file) {
    if (test(file)) {
      return config.transform(file);
    } else {
      return through();
    }
  }
};

