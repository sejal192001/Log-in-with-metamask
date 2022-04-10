const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ app: './.env'});
const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    hash_value: process.env.DATABASE_HASH_VALUE,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.set('view engine', 'hbs');
db.connect( (error)  => {
    if(error){
        console.log(error)
    }else {
        console.log("MYSQL connected...")
    }
})

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(5001,() => {
    console.log("Server started on port 8003");
})