import webpack from 'webpack';

const webpackPro = {
	entry:{
		vender: ['angular', 'angular-ui-router']
	},
    plugins: [
    new webpack.optimize.CommonsChunkPlugin('vender', 'js/common.js'),
        new webpack.ProvidePlugin({
            angular: 'angular'
        })
    ]
}


export default webpackPro;