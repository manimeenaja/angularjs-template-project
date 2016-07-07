module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  htmlTmpl: {
    files: 'app/src/**/*.tpl.html',
    tasks: ['html2js'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  js: {
    files: ['<%= appConfig.paths.app %>/src/{,*/}*.js',
      '<%= appConfig.paths.temp %>/generated/scripts/templates.js'
    ],
    tasks: ['newer:jshint:all'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  jsTest: {
    files: ['<%= appConfig.paths.test %>/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },
  css: {
    files: '<%= appConfig.paths.app %>/styles/{,*/}*.scss',
    tasks: ['sass'],
    options: {
      livereload: true,
    },
  },
  styles: {
    files: ['<%= appConfig.paths.app %>/styles/{,*/}*.css'],
    tasks: ['newer:copy:styles', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: ['<%= appConfig.paths.app %>/{,*/}*.html',
      '<%= appConfig.paths.app %>/{,*/}*.scss',
      '<%= appConfig.paths.temp %>/styles/{,*/}*.css',
      '<%= appConfig.paths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }
};