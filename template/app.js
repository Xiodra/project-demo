var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var { log } = require('pao-aop');
var connecthistoryapifallback = require("connect-history-api-fallback");
const config = require('./app.json');

var hostName = process.env.HOST || '0.0.0.0', encoding = 'utf8';

var app = express();
expressApp = app;

log('express', '设定静态目录');
// 设定找不到的get请求跳转index.html
app.use(connecthistoryapifallback());

// 静态目录设定
if (config.staticDirectory) {
    const staticPath = path.join(process.cwd(), config.staticDirectory);
    log('express', `express应用启动目录[${process.cwd()}]`);
    log('express', `静态目录'[${staticPath}]`);
    app.use(express.static(staticPath));
}

// 设置端口
app.set('port', config.httpPort);
app.set('host', hostName);
app.set('trust proxy', true);

// 启动服务
http.createServer(app).listen(config.httpPort, hostName, () => {
    log('express', `Express HTTP 服务开始在端口${hostName}:${config.httpPort}监听`);
});


if (config.httpsPort && config.httpsOption) {
    try {
        //读取公私钥文件
        const privateKey = fs.readFileSync(path.join(process.cwd(), config.httpsOption.privateKeyPath), encoding),
            certificate = fs.readFileSync(path.join(process.cwd(), config.httpsOption.certificatePath), encoding);
        https.createServer({ key: privateKey, cert: certificate }, app).listen(config.httpsPort, config.hostName, () => {
            log('express', `Express HTTPS 服务开始在端口${hostName}:${config.httpsPort}监听`);
        });
    } catch (error) {
        log('express', 'Express HTTPS 服务开始异常，' + error.message);
    }
}