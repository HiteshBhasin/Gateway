const express = require("express");
const app = express();
const {createProxyMiddleware} = require("http-proxy-middleware");
require('dotenv').config();
//https://www.geeksforgeeks.org/json-web-token-jwt/
const jwt = require("jasonwebtoken");
const port = process.env.PORT || 3000;
const key = process.env.SECRET_KEY || "superkey";

// below two wont work because we do not have set up 
//the two servers and run them , once we have set up the server 
//the proxy will redirect to the respected servers. 
const SERVICE = {
    users: 'http://localhost:3001/users',

    orders: 'http://localhost:3002/orders' 
};

app.get("/status", (req,res)=>{
    res.send("running a http proxy api")
});
// learning "createProxyMiddleware", https://dzone.com/articles/how-to-build-a-nodejs-api-proxy-using-http-proxy-m
const proxyWorker = createProxyMiddleware({
    target: SERVICE.users,
    changeOrigin: true,
    pathRewrite: { '^/api/users': '/users' }, 
});
const proxyWorker2 = createProxyMiddleware({
    target: SERVICE.orders,
    changeOrigin: true,
    pathRewrite: { '^/api/orders': '/orders' }, 
});
app.use('/api/users', proxyWorker);
app.use('/api/orders', proxyWorker2);

app.listen(port, ()=>{
    console.log(`proxy is running on ${port}`)
});


