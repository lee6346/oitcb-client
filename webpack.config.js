const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles

    // check if it is development build stage
    const isDevBuild = !(env && env.prod);
    // shared configuration (server and client)
    // transforms .ts, .html, .css, and image files, bundles, and outputs into the [name].js file in the /dist/ directory
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: ['.js', '.ts'] },
        //the bundled/compiled file will go in the /dist directory
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        //transforms ts, html, css, and image files into modules that js can read using loaders
        module: {
            rules: [
                { test: /\.ts$/, include: /ClientApp/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        //used 
        plugins: [new CheckerPlugin()]
    };

    // Configuration for client-side files, merges with the shharedConfig
    // 1. gets the depedency graph from the /boot-client.ts file (includes the app module, HMR config, etc)
    // 2. determines the plugins required based on dev or prod build
    // 3. transpiles/bundles the dependencies, then outputs it in the wwwroot/dist/ directory (main-client.js)
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        //specify the entry point for depedencies in the client bundle
        entry: { 'main-client': './ClientApp/boot-client.ts' },
        //the file is output into /wwwroot/dist
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        // uses the following
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    // 1. gets the dependency graph from the /boot-server.ts file
    // 2. retrieves the plugins
    // 3. outputs to the /ClientApp/dist/ directory (main-server.js)
    const serverBundleConfig = merge(sharedConfig, {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};
