module.exports = {
  generic: {
    src: ['Gruntfile.js', 'app/src/**/*.js'],
    exclude: ['doNotTest.js'],
    options: {
      breakOnErrors: true,
      jsLintXML: 'jslint-report.xml',
      checkstyleXML: 'checkstyle.xml',
      errorsOnly: false,
      cyclomatic: [3, 7, 12],
      halstead: [8, 13, 20],
      maintainability: 100,
      hideComplexFunctions: false,
      broadcast: false
    }
  }
};