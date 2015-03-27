var filterify = require('./filterify');
var test = require('tape');


test('Function filter', function(t) {
  var filter = function(file) {
    return file.toLowerCase().indexOf('dom') !== -1
  };
  var filtered = runTestTransform(filter);

  t.deepEqual(filtered, [
    '/Users/james/dev/webapp/node_modules/react/lib/DOMPropertyOperations.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOM.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOMComponent.js'
  ]);
  t.end();
});

test('String filter', function(t) {
  var filter = 'Component';
  var filtered = runTestTransform(filter);

  t.deepEqual(filtered, [
    '/Users/james/dev/webapp/node_modules/react/lib/ReactComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactCompositeComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOMComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactTextComponent.js'
  ]);
  t.end();
});

test('Regex filter', function(t) {
  var filter = /React[DMP]/;
  var filtered = runTestTransform(filter);

  t.deepEqual(filtered, [
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOM.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOMComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDefaultInjection.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactMount.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactMultiChild.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactPerf.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactPropTypes.js'
  ]);
  t.end();
});

test('Array of filters', function(t) {
  var filter = [
    function(file) {
      return file.toLowerCase().indexOf('dom') !== -1
    },
    'Component',
    /React[DMP]/,
  ];
  var filtered = runTestTransform(filter);

  t.deepEqual(filtered, [
    '/Users/james/dev/webapp/node_modules/react/lib/DOMPropertyOperations.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactCompositeComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOM.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDOMComponent.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactDefaultInjection.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactMount.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactMultiChild.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactPerf.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactPropTypes.js',
    '/Users/james/dev/webapp/node_modules/react/lib/ReactTextComponent.js',
  ]);
  t.end();
});


test('Throws on missing filter param', function(t) {
  t.throws(function() {
    filterify({
      transform: function(file) { return true; }
    });
  }, /config.test must be a function, string, regex, or an array of valid tests/);
  t.end();
});

test('Throws on malformed filter param', function(t) {
  t.throws(function() {
    filterify({
      filter: 1,
      transform: function(file) { return true; }
    });
  }, /config.test must be a function, string, regex, or an array of valid tests/);
  t.end();
});

test('Throws on malformed transform param', function(t) {
  t.throws(function() {
    filterify({
      filter: 'react',
      transform: 'react'
    });
  }, /config.transform must be a browserify transform/);
  t.end();
});

test('Throws on missing transform param', function(t) {
  t.throws(function() {
    filterify({
      filter: 'react'
    });
  }, /config.transform must be a browserify transform/);
  t.end();
});

function runTestTransform(filter) {
  var seenFiles = [];
  var testTransform = function(file) {
    seenFiles.push(file);
  }

  var filtered = filterify({
    filter: filter,
    transform: testTransform
  });

  testFiles.forEach(function(file) {
    filtered(file);
  });

  return seenFiles;
}

var testFiles = [
  '/Users/james/dev/webapp/node_modules/react/react.js',
  '/Users/james/dev/webapp/node_modules/react/lib/React.js',
  '/Users/james/dev/webapp/node_modules/react/lib/DOMPropertyOperations.js',
  '/Users/james/dev/webapp/node_modules/react/lib/EventPluginUtils.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactChildren.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactComponent.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactCompositeComponent.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactContext.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactCurrentOwner.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactElement.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactElementValidator.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactDOM.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactDOMComponent.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactInstanceHandles.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactLegacyElement.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactDefaultInjection.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactMount.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactMultiChild.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactPerf.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactPropTypes.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactServerRendering.js',
  '/Users/james/dev/webapp/node_modules/react/lib/ReactTextComponent.js',
  '/Users/james/dev/webapp/node_modules/react/lib/Object.assign.js',
];

