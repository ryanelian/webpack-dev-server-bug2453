# Webpack Dev Server Bug #2453

> webpack-dev-server is not compatible with the latest webpack 5 beta 14

https://github.com/webpack/webpack-dev-server/issues/2453

## Getting Started

Using the command line, run:

`node wds-cli.js`

## Sanity Checking

Uncomment to prove that the webpack configuration is valid for normal webpack build:

```js
// webpack(config, (err, stats) => {
//     console.log('webpack build OK!');
// });
```

Then, comment everything below that line.
