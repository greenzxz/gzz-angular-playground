module.exports = function(config){
  config.set({
    
    preprocessors: {
      'app/barchart/**/*.html': ['ng-html2js']
    },

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/d3/d3.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/barchart/*.js',
      'app/barchart/**/*.html',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor',
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: function(htmlPath, originalPath) {
        return htmlPath
      }
    }

  });
};
