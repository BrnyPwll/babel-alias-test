import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';

let paths = {
    src: path.resolve('./src/client/scripts'),
    components: './src/components',
    dest: './build/public/scripts'
};

webpack.debug = true;

let handleError = (err, stats) => {
    if (err) {
        throw new gutil.PluginError('webpack', err);
    }

    let statColour = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

    if (stats.compilation.errors.length > 0) {
        stats.compilation.errors.forEach((error) => {
            statColour = 'red';
            gutil.log(gutil.colors['red'](error));
        });
    } else {
        let compileTime = stats.endTime - stats.startTime;
        gutil.log(gutil.colors[statColour](stats));
        gutil.log('Compiled with', gutil.colors.cyan('webpack'), 'in', gutil.colors.magenta(compileTime), 'ms');
    }

};

gulp.task('alias', () => {
    webpack({
        context: paths.src,
        plugins: [],
        resolve: {
            root: paths.src,
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: [
                                    ["babel-plugin-module-alias", [
                                {
                                    "src": "./src/components",
                                    "expose": "components"
                                }
        ]]
                        ]
                    },
                    exclude: /node_modules/
                }
            ]
        },
        entry: {
            'home': ['./pages/withAlias.jsx']
        },
        output: {
            path: path.normalize(paths.dest),
            fileName: '[name].js',
            publicPath: paths.dest
        }
    }, handleError);

});

gulp.task('relative', () => {
    webpack({
        context: paths.src,
        plugins: [],
        resolve: {
            root: paths.src,
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015', 'stage-0']
                    },
                    exclude: /node_modules/
                }
            ]
        },
        entry: {
            'home': ['./pages/withRelativePath.jsx']
        },
        output: {
            path: path.normalize(paths.dest),
            fileName: '[name].js',
            publicPath: paths.dest
        }
    }, handleError);

});