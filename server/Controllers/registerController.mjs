import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
import bcrypt from 'bcrypt'
const db = new DB("../curs_summer.db")
import jwt from 'jsonwebtoken'
const urlencodedParser = express.urlencoded({extended: false})


router.post('/', urlencodedParser, function(req, res) {
  console.log(req.body)
  const user_pack = [
    req.body.firstname, 
    req.body.lastname, 
    req.body.secondname, 
    req.body.email, 
    req.body.group, 
    bcrypt.hashSync(req.body.password1, 8)
  ]

  db.insert(user_pack, function (err) {
		if (err) return res.status(500).send(err)
		
		db.selectByEmail(req.body.email, (err, user) => {
			if (err) return res.status(500).send(err)
			
			let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
	
			res.status(200).send({ auth: true, token: token, user: user });

		}); 



  }); 
});


export default router;