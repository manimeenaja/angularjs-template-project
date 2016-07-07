module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= appConfig.paths.app %>',
      dest: '<%= appConfig.paths.dist %>',
      src: ['*.{ico,png,txt}',
        '.htaccess',
        '*.html',
        '{,*/}*.html',
        'images/{,*/}*.{webp}',
        '{,*/}*icons.*'
      ]
    }, {
      expand: true,
      cwd: '<%= appConfig.paths.temp %>/images',
      dest: '<%= appConfig.paths.dist %>/images',
      src: ['generated/*']
    },
    {
        expand: true,
        flatten: true,
        cwd: '<%= appConfig.paths.app %>',
        dest: '<%= appConfig.paths.dist %>/fonts',
        src: [
          '{,*/}*/fonts/*.*'
        ]
      }]
  },
  styles: {
    expand: true,
    cwd: '<%= appConfig.paths.app %>/styles',
    dest: '<%= appConfig.paths.temp %>/styles/',
    src: '{,*/}*.css'
  }
};