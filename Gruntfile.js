module.exports = function(grunt) {

	var scssSrc 	= 'css',
		jsSrc 		= 'js/',
		imgSrc 		= 'img/',
		buildDest	= 'build/',
		cssDest 	= buildDest  + 'css/',
		jsDest 		= buildDest  + 'js/',
		imgDest 	= buildDest  + 'img/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					style: 'expanded',
					lineNumbers: true
				},
				files: [{
					expand : true,
					cwd: scssSrc,
					src: ['**/*.scss'],
					dest: cssDest,
					ext: '.css'
				}]
			},

			dist: {
				options: {
					style: 'compressed',
					lineNumbers: false
				},
				files: [{
					expand : true,
					cwd: scssSrc,
					src: ['*.scss'],
					dest: cssDest,
					ext: '.css'
				}]
			}
		},

		svg2png: {
			all: {
				files: [
					{
						cwd: imgSrc,
						src: ['**/*.svg'],
						dest: buildDest + 'img/png/' }
				]
			}
		},

		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{ removeViewBox: false }]
				},
				files: [{
					expand: true,
					cwd: imgSrc,
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: imgDest
				}]
			}
		},

		jshint: {
			all: [jsSrc + 'app/main.js']
		},

		concat: {
			options: {
				separator: ';',
				banner: '/*! <%= pkg.name %> | <%= grunt.template.today("dd-mm-yyyy H:mm:ss") %> */'
			},
			dist: {
				src: [
					'<banner>',
					jsSrc + 'vendor/jquery/2.1.3/jquery.min.js',
					jsSrc + 'lib/jquery.easytabs.min.js',
					jsSrc + 'app/main.js'
				],
				dest: jsDest +'app.js'
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9']
			},
			all: {
				src: cssDest + 'main.css'
			}
		},

		watch: {
			files: [
				scssSrc + '**/*.scss',
				jsSrc + '**/*.js'
			],
			tasks: ['sass:dist',  'concat']
		}

	});


	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', ['sass:dist', 'concat']);

};