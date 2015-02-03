var conf_port=9001;
module.exports = function(grunt) {

      grunt.initConfig({
//		Import package manifest
      pkg: grunt.file.readJSON("package.json"),

      connect: {
		    server: {
			        port: 9001
		    }
		  },

      shell: {
			runLocalServer: {
				command: 'DEBUG=personalqr* node server/server'
			},
			runLocalServerWin32: {
				command: [
					'set DEBUG=personalqr*',
					'node server/server'
				].join('&&'),
                command: [
					'cd C:/Program Files/MongoDB 2.6 Standard/bin/',
                    './mongod.exe '
				].join('&&')
			}
//			,
//          dredd: {
//				command: 'CONFIG=dredd dredd ./server/api/apiary/apiary.apib http://localhost:'+conf_port;
//			}
		},

        jshint: {
			server: {
				src: ['Gruntfile.js',
                        'server/dao/**/*.js',
                        'server/manager/**/*.js',
                        'server/middleware/**/*.js',
                        'server/routes/**/*.js',
                        'server/util/**/*.js',
                        'server/server.js'
						]
			},//server
			client: {
				options: {
					extract: 'auto'
				},
				src: ['*.html', 'pages/**/*.html', 'core/**/*']
			}//client
		},//jshint
        vulcanize: {
			default: {
				options: {
					csp: true,
					excludes: {
						imports: [
							"bower_compoents/polymer.html"
						]
					}
				},
				files: {
					'_/index.html': 'index.html'
				},
	         }
		},//vulcanize
        uglify: {
          my_target: {
            files: {
            '_/js/middleware.min.js':['/server/middleware/*'],
            '_/js/util.min.js':['/server/util/*'],
            '_/js/server.min.js':['/server/server.js']
            }
          } //my_target
        },//uglify
        imagemin: {

            main: {

              files: [{
                expand: true,
                cwd: '/img/',
                src: ['**/*.{png,jpg,gif,.svg}'],
                dest: '_/img/'
              }]

            }
        },//imagemin
        browserSync: {

          dev: {
            bsFiles: {
              src : [
                '/core/*',
                '/core/**/*.html',
                '/core/**/*.js',
                '/core/**/*.css',
                '/img/**/*.jpg',
                '/img/**/*.png',
                '/img/**/*.svg',
                '/pages/**/*.html',
                '**/*.html'
                ]
              },
            options: {
                watchTask: true,
                debugInfo: true,
                logConnections: true,
                notify: true,
                proxy: "personalqr.ds:8000",
                ghostMode: {
                  scroll: true,
                  links: true,
                  forms: true
                }
            }
          } //dev
        }, // browserSync
        watch: {

          scripts: {
            files: ['**/*.js'],
            tasks: ['uglify'],
            options: {
              spawn: false,
            }
          } //scripts
//        , images: {
//
//            files: ['_/img/*.{png,jpg,gif}'],
//            tasks: ['imagemin'],
//            options: {
//              spawn: false,
//            }
//          }//images
        } //watch

      });


    grunt.loadNpmTasks('grunt-contrib-watch'); //control modificates in live
    grunt.loadNpmTasks('grunt-contrib-uglify');//minificar js
    grunt.loadNpmTasks('grunt-contrib-imagemin');//minificar image
    grunt.loadNpmTasks('grunt-contrib-cssmin');  //minificar css
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //minifica html
	grunt.loadNpmTasks('grunt-contrib-jshint'); //tester
    grunt.loadNpmTasks('grunt-newer');// check changes
    grunt.loadNpmTasks('grunt-browser-sync'); // nav-syncronizated
	grunt.loadNpmTasks('grunt-connect');

    grunt.log.writeln('Start PersonalQR:');

    //TYPES RUN
    grunt.registerTask('connect',['connect']);
	  grunt.registerTask('default',['jshint:client', 'jshint:server', 'shell: runLocalServer','watch']);
    grunt.registerTask('win',['jshint:client', 'jshint:server', 'shell:runLocalServerWin32','watch']);
    grunt.registerTask('run', function() {
		(process.platform === "win32") ? grunt.task.run('shell: runLocalServerWin32') : grunt.task.run('shell: runLocalServer')
	});
	grunt.registerTask('sync', ['browserSync' , 'watch']);
    //symplificator
    grunt.registerTask('minifi', ['imagenmin', 'uglify' , 'cssmin', 'htmlmin', 'newer' , 'watch']);

    grunt.log.writeln('Readdy... http://localhost:9001');
};
