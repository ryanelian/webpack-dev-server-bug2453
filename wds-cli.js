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
console.log(config);
console.log(config.entry);

const compiler = webpack(config);
const devServer = new WDS(compiler, wdsConfig);

devServer.listen(port, 'localhost', err => {
    // noop
});

/*
  message: 'Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.\n' +
    ' - configuration.entry should be one of these:\n' +
    '   function | object { <key>: non-empty string | [non-empty string, ...] (should not have fewer than 1 item, should not have duplicate items) | object { import, dependOn?, filename?, library? } } (should not have fewer than 1 property) | non-empty string | [non-empty string, ...] (should not have fewer than 1 item, should not have duplicate items)\n' +
    '   -> The entry point(s) of the compilation.\n' +
    '   Details:\n' +
    "    * configuration.entry['main'].filename should be one of these:\n" +
    '      non-empty string | function\n' +
    '      -> Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.\n' +
    '      Details:\n' +
    "       * configuration.entry['main'].filename should be a non-empty string.\n" +
    "       * configuration.entry['main'].filename should be an instance of function."
*/
