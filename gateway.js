const express = require("express");
const app = express();
const {createProxyMiddleware} = require("http-proxy-middleware");
require('dotenv').config();
//https://www.geeksforgeeks.org/json-web-token-jwt/
const jwt = require("jasonwebtoken");
const exp_jwt = require("express-jwt");
const port = process.env.PORT || 3000;
const key = process.env.SECRET_KEY || "superkey";

// below two wont work because we do not have set up 
//the two servers and run them , once we have set up the server 
//the proxy will redirect to the respected servers. 
const SERVICE = {
    users: 'http://localhost:3001/users',

    orders: 'http://localhost:3002/orders' 
};

const authenticate = exp_jwt({secret:key, algorithm: ['HS256']});

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

const loadBalancer = (service)=>{
    //  need to figure out which load balance calculation need to go here based on 
    // reqest per min and how much a server can take.  
}
app.use('/api/users', authenticate,proxyWorker, next);
app.use('/api/orders', authenticate, proxyWorker2, next);

app.listen(port, ()=>{
    console.log(`proxy is running on ${port}`)
});


