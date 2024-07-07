const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //webpack插件，用于清除目录文件
const config = require('./webpack.base.config.js')

config.output.publicPath = './'
config.mode = 'production'
config.devtool = 'nosources-source-map'
config.module.rules.push(
	{
		test: /\.(es6|jsx|js|ts|tsx)$/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['last 2 versions', 'safari >= 7'],
								},
								modules: 'umd',
								useBuiltIns: 'usage',
								corejs: 3,
								debug: false,
							},
						], // 用于将现代 JavaScript 转换为兼容旧版环境的代码
						[
							'@babel/preset-react',
							{
								runtime: 'automatic', // 对于 React 17 或更高版本
							},
						],
						'@babel/preset-typescript', // 用于处理 TypeScript
					],
					plugins: [
						// 这里可以添加 Babel 插件，例如：
						'@babel/plugin-proposal-class-properties', // 用于支持类属性语法
						'@babel/plugin-transform-runtime', // 避免重复引入辅助代码
					],
				},
			},
			{
				loader: 'ts-loader',
				options: {
					// 关闭类型检查，即只进行转译
					// 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
					transpileOnly: true,
					happyPackMode: true,
					configFile: './tsconfig/tsconfig.client.json', // 使用客户端的 tsconfig
				},
			},
		],
	},
	{
		test: /\.(less|css)$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {},
			},
			'css-loader',
			'postcss-loader',
			'less-loader',
		],
	},
	{
		test: /\.(jpe?g|png|gif|svg|ico)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'img/[name].[hash:6][ext]',
		},
		parser: {
			dataUrlCondition: {
				maxSize: 100 * 1024,
			},
		},
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf)$/i, // 匹配字体文件
		type: 'asset/resource', // 使用 asset/resource 模块
		generator: {
			filename: 'fonts/[name].[hash:6][ext][query]', // 输出文件名和路径
		},
	},
)
config.plugins.push(
	new CleanWebpackPlugin(), // 默认删除webpack output.path目录中的所有文件
	// css文件抽离设置
	new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash].css',
	}),
	// 体积分析插件
	new BundleAnalyzerPlugin(),
)

module.exports = config
