const express = require("express");
const app = express();
const {createProxyMiddleware} = require("http-proxy-middleware");
require('dotenv').config();

const port = process.env.PORT || 3000;



const SERVICE = {
    users: 'https//localhost:3001',
    orders: 'https//localhost:3002' 
};

app.get("/status", (req,res)=>{
    res.send("running a http proxy api")
});

const proxyWorker = createProxyMiddleware({
    target: SERVICE.users,
    changeOrigin: true,
})


