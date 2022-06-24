import * as express from "express";
import * as bodyParser from 'body-parser';
import { routes } from './middleware/routes';
var multer = require('multer'); //multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

const app = express();
const PORT = 4000;

app.get('/api/test', (req, res) => {
  res.send('hellow');
})

//处理跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。req.headers['origin']
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  // res.header('Access-Control-Allow-Credentials', true);//允许携带cookie 如果前端配置了这个withCredentials=true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址
  if (req.method == 'OPTIONS') {
    res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  } else {
    next();
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './tmp/' }).any('file', 1))// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method]('/api' + path, ...middleware, handler);
});
// 捕获可以让系统崩溃的错误，避免进程反复重启
process.on('uncaughtException', function (err) {
  err.name = "UncaughtExceptionError";
  console.log('Caught exception: ' + err.stack);
});
app.listen(PORT, () => {
  console.log(`shoppingAPI port:${PORT}已启动!!`)
})
module.exports = app;