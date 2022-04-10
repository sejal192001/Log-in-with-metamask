const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcypt = require("bcryptjs");
const async = require("hbs/lib/async");
const bcrypt = require("bcryptjs/dist/bcrypt");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    hash_value: process.env.DATABASE_HASH_VALUE,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
console.log(req.body);


const { name, email, password, passwordConfirm, hash_value } = req.body;

db.query('SELECT email FROM  users WHERE email =?',[email],async(error,results)  =>{
    if(error) {
        console.log(error);
    }
    
    if(results.length > 0 ) {
        return res.render('register',{
            message: "That email is alredy in use"
        })
    }else if( password !== passwordConfirm) {
    
        return res.render('register',{
            message: "Password do not match"
        });
    }

    let hashdPassword = await bcrypt.hash(password,8);
    console.log(hashdPassword);

    db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashdPassword, hash_value: hash_value},(error,results) =>{
        if(error){
            console.log(error);
        }else{
            console.log(results);
            return res.render('register',{
                message: "user registered"
            });
        }
    })


});

}