const express = require('express');
const app = express();
const user = require('./controller/user');
require('./models/db') // for connecting database
require('dotenv').config()

app.use(express.json()); // middleware for accessing req

app.use('/', user); // controller files


app.listen(process.env.PORT || 5000 , ()=>{
    console.log(  `server is listing on port: ${process.env.PORT}` );
}) // running server 