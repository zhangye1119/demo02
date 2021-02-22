// module.exports = {
//   proxyTable: {
//     '/api': {
//         target: 'https://music.163.com', //你要跨域的网址  比如  'http://news.baidu.com',
//          secure: true, // 如果是https接口，需要配置这个参数
//         changeOrigin: true ,//这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
//         pathRewrite: {
//             '^/api': '/api' //路径的替换规则
//                 //这里的配置是正则表达式，以/api开头的将会被用用‘/api’替换掉，假如后台文档的接口是 /api/list/xxx
//                 //前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx
//         }
//     }
//   }
// }

module.exports = {
    devServer:{
        port:8086, // 启动端口
        // open:true  // 启动后是否自动打开网页
        proxy: {  //配置跨域
            '/api': {
                target: 'https://autumnfish.cn/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                secure: true,
                changOrigin: true,  //允许跨域
                pathRewrite: {
                　　'^/api': ''  //请求的时候使用这个api就可以
                }
            }
        }    
    }
}