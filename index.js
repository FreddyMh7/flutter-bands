const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
require('dotenv').config();

//App De Express
const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);  
require('./sockets/socket');

//path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
server.listen(process.env.PORT, (err) => {
    if(err)throw Error(err);
    console.log("Servidor corriendo en puerto", process.env.PORT);
});