const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            { test:/\.css$/,use:["style-loader","css-loader"] },
            { test:/\.less$/,use:["style-loader","css-loader","less-loader"] },
            { test:/\.scss$/,use:["style-loader","css-loader","sass-loader"] },
            { test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=6789&name=[hash:8]-[name].[ext]' },
            { test:/\.js$/,use:'babel-loader',exclude:/node_module/},
            { test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader' },
            { test:/\.vue$/,use:'vue-loader' }
        ]
    },
    resolve:{
        alias:{//这是修改vue被导入时候的包的路径
        //    "vue$":"vue/dist/vue.js" 
        }
    }
}