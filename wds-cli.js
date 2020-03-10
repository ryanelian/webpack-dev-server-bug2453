const webpack = require('webpack');
const WDS = require('webpack-dev-server');
const path = require('path');

const main = require.resolve('./src/index');

const config = {
    entry: {
        // new webpack 5 beta 14 features:
        // "Allow a entry description object for advanced entrypoint configuration"
        // https://github.com/webpack/webpack/releases/tag/v5.0.0-beta.14
        main: {
            import: [main],
            filename: 'bundle.js'
        }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[name].js'
    },
    mode: 'development'
};

const port = 38765;

const wdsConfig = {
    hot: true,
    contentBase: false,
    port: port,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

// UNCOMMENT THESE LINES FOR SANITY CHECKING THE WEBPACK CONFIGURATION!
////////////////////////////////////////////////////////////////////////
// webpack(config, (err, stats) => {
//     console.log('webpack build OK!');
// });
////////////////////////////////////////////////////////////////////////

// The following line causes invalid configuration:
////////////////////////////////////////////////////////////////////////
WDS.addDevServerEntrypoints(config, wdsConfig);
////////////////////////////////////////////////////////////////////////
console.log(JSON.stringify(config, null, 4));

const compiler = webpack(config);
const devServer = new WDS(compiler, wdsConfig);

devServer.listen(port, 'localhost', err => {
    // noop
});

/*
ValidationError: Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
 - configuration.entry should be one of these:
   function | object { <key>: non-empty string | [non-empty string, ...] (should not have fewer than 1 item, should not have duplicate items) | object { import, dependOn?, filename?, library? } } (should not have fewer than 1 property) | non-empty string | [non-empty string, ...] (should not have fewer than 1 item, should not have duplicate items)
   -> The entry point(s) of the compilation.
   Details:
    * configuration.entry['main'].filename should be one of these:
      non-empty string | function
      -> Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.
      Details:
       * configuration.entry['main'].filename should be a non-empty string.
       * configuration.entry['main'].filename should be an instance of function.
    at validate (D:\VS\VueHMR\node_modules\.pnpm\registry.npmjs.org\schema-utils\2.6.4\node_modules\schema-utils\dist\validate.js:85:11)
    at validateSchema (D:\VS\VueHMR\node_modules\.pnpm\registry.npmjs.org\webpack\5.0.0-beta.14_webpack@5.0.0-beta.14\node_modules\webpack\lib\validateSchema.js:36:2)
    at webpack (D:\VS\VueHMR\node_modules\.pnpm\registry.npmjs.org\webpack\5.0.0-beta.14_webpack@5.0.0-beta.14\node_modules\webpack\lib\webpack.js:88:2)
    at Object.<anonymous> (D:\VS\VueHMR\wds-cli.js:48:18)
    at Module._compile (internal/modules/cjs/loader.js:1158:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)
    at Module.load (internal/modules/cjs/loader.js:1002:32)
    at Function.Module._load (internal/modules/cjs/loader.js:901:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)
    at internal/main/run_main_module.js:18:47
*/
