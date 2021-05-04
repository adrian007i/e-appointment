module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        configFile: 'eslint.json',
        useEslintrc: false,
        fix: false,
        failOnError: false
      },
      target: [
        '*.js',
        'test/**/*.js',
        'server/**/*.js',
        'client/src/**/*.js'
      ]
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'client/src/App.css': 'client/src/sass/style.scss' // 'destination': 'source'
        }
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({ overrideBrowserslist: 'last 2 versions' }) // add vendor prefixes
        ]
      },
      dist: {
        src: 'client/src/App.css'
      }
    },
    jsdoc: {
      dist: {
        src: [
          '*.js',
          'test/**/*.js',
          'server/**/*.js',
          'client/src/**/*.js',
          'README.md'
        ],
        options: {
          destination: 'documentation',
          template: 'node_modules/ink-docstrap/template',
          configure: 'jsdoc.json'
        }
      }
    },
    watch: {
      css: {
        files: ['client/src/sass/*.scss'],
        tasks: ['compile-css', 'post-css']
      },
      scripts: {
        files: [
          '*.js',
          'test/**/*.js',
          'server/**/*.js',
          'client/src/**/*.js'
        ],
        tasks: ['create-doc', 'lint-js']
      },
      options: {
        spawn: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('lint-js', ['eslint']);
  grunt.registerTask('compile-css', ['sass']);
  grunt.registerTask('post-css', ['postcss']);
  grunt.registerTask('create-doc', ['jsdoc']);

  grunt.registerTask('js', [
    'lint-js'
  ]);

  grunt.registerTask('doc', [
    'create-doc'
  ]);

  grunt.registerTask('css', [
    'compile-css',
    'post-css'
  ]);

  grunt.registerTask('default', [
    'lint-js'
  ]);
};
