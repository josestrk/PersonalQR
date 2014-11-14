module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js',
				'features/**/*.js',
				'model/**.js'
			]
		},
		connect: {
		    server: {
			port: 9001
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-connect');

	grunt.registerTask('default', ['jshint', 'connect']);

};
