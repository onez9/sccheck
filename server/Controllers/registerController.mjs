import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
import bcrypt from 'bcrypt'
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
const urlencodedParser = express.urlencoded({extended: false})

const db_path = './curs_summer.db'

router.post('/', urlencodedParser, function(req, res) {
  console.log(req.body)
  const user_pack = [
    req.body.firstname, 
    req.body.secondname, 
    req.body.lastname, 
    req.body.email, 
    req.body.group, 
    bcrypt.hashSync(req.body.password1, 8)
  ]
  console.log(user_pack, 'may be,,,may be')

  const db = new sqlite3.Database(db_path, (err)=>{
    console.log(err)
  })
  
  let stmt = db.prepare("INSERT INTO users (firstname, secondname, lastname, email, 'group', password) VALUES (?,?,?,?,?,?)")
  stmt.run(user_pack, (err) => {
    if (err) return res.status(500).send(err)
    // stmt.finalize()
  })
  stmt = db.prepare(`SELECT * FROM users WHERE email = ?`)

  stmt.get([req.body.email], function(err,rows) {
    console.log(rows)
    if (err) return res.status(500).send(err)
			
    let token = jwt.sign({ id: rows.id }, config.secret, { expiresIn: 86400 });
    req.session.token=token
    // res.status(200).send({ 
    //   auth: true, 
    //   token: token, 
    //   user: rows
    // });
    stmt.finalize()
    res.redirect(`http://${config.host}:5173/login`)
    // res.redirect('/login')



  })

});


export default router;