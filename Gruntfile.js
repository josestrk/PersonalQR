module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'features/**/*.js', 'model/**.js']
		},
		connect: {
		    server: {
		      options: {
			port: 9001,
			base: 'www-root'
		      }
		    }
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-connect');

	grunt.registerTask('default', ['jshint', 'connect']);

};
