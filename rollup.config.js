// import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
// import cleaner from 'rollup-plugin-cleaner';

// const production = !process.env.ROLLUP_WATCH;

// HMR
import sveltehot from 'rollup-plugin-svelte-hot'
import hmr from 'rollup-plugin-hot'

const isNollup = !!process.env.NOLLUP
const isWatch = !!process.env.ROLLUP_WATCH
const isLiveReload = !!process.env.LIVERELOAD
const isDev = isWatch || isLiveReload
const isProduction = !isDev
const isHot = isWatch && !isLiveReload
// ---

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: false,
		format: 'es',
		name: 'app',
		dir: 'public/build/',
    chunkFileNames: '[name]-[hash].js'
    // chunkFileNames: '[name].js'
    // chunkFileNames: '[hash].js'
	},
  // manualChunks: manualChunks, // error :(
  cache: false,
  treeshake: false,
	plugins: [
    // cleaner({
    //   targets: [
    //     'public/build/'
    //   ]
    // }),
    
		// svelte({
    // hydratable: true,
		// 	// enable run-time checks when not in production
		// 	dev: !production,
		// 	// we'll extract any component CSS out into
		// 	// a separate file - better for performance
		// 	css: css => {
		// 		css.write('css/bundle.css');
		// 	}
		// }),
    
    // HMR
    sveltehot({
      hydratable: true,
      // enable run-time checks when not in production
      dev: !isProduction,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      // NOTE when hot option is enabled, this gets automatically be turned to
      // false because CSS extraction doesn't work with HMR currently
      css: css => {
        css.write('public/build/css/bundle.css') // skip when HRM
      },
      hot: isHot && {
        // Optimistic will try to recover from runtime
        // errors during component init
        optimistic: true,
        // Turn on to disable preservation of local component
        // state -- i.e. non exported `let` variables
        noPreserveState: false,

        // See docs of rollup-plugin-svelte-hot for all available options:
        //
        // https://github.com/rixo/rollup-plugin-svelte-hot#usage
      },
    }), 

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

    // HRM
    isDev && !isNollup && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),

    // HMR
    isLiveReload && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		// production && terser()

    // HRM
    isProduction && terser(),

    hmr({
      public: 'public',
      inMemory: true,

      // Default host for the HMR server is localhost, change this option if
      // you want to serve over the network
      // host: '0.0.0.0',
      // You can also change the default HMR server port, if you fancy
      // port: '12345'

      // This is needed, otherwise Terser (in npm run build) chokes
      // on import.meta. With this option, the plugin will replace
      // import.meta.hot in your code with module.hot, and will do
      // nothing else.
      compatModuleHot: !isHot
    }),
	],
	watch: {
		clearScreen: false
	}
};
