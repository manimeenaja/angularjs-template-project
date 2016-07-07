module.exports = {
	dist : {
		files : [ {
			expand : true,
			cwd : '<%= appConfig.paths.app %>/styles',
			src : [ '*.scss' ],
			dest : '<%= appConfig.paths.app %>/styles',
			ext : '.css'
		} ]
	}
};