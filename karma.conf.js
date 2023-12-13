module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      browsers: ['Chrome'],
      files: [
        'src/**/*.js',
        'test/**/*.spec.js'
      ],
    });
  };