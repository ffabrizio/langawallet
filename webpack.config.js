/* global __dirname */

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "dist/app.js"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" },
            { test: /\.sol/, loader: "./../contracts/loader.js" }
        ]
    }
};