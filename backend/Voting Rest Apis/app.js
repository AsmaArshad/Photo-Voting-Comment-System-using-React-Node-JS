const express = require("express");
const cors = require('cors');
let path = require('path');
const bodyparser = require('body-parser')
require('dotenv').config();

const Port = process.env.Port;

// routes 
const photo_Route = require('./routes/Photos/photos.js');
const comment_Route = require('./routes/Photos/comments.js');
const app = express() 

app.use(cors({
    origin: `*`,
    methods:["GET", "POST"]
 }));
app.use(bodyparser.json())
//app.use('/images', express.static("./images"))
app.use('/public', express.static("public"))
app.use(photo_Route);
app.use(comment_Route);

app.listen(Port, () => {
    console.log('server is up at port:' + Port);
})