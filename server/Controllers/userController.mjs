import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import config from'../config/config.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'
const urlencodedParser = express.urlencoded({extended: false})


router.post('/', urlencodedParser, function(req, res) {
  console.log(req.body)
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
  let stmt = db.prepare('select * from users')
  stmt.all([], (err, rows) => {
    res.json(rows)
    stmt.finalize()
  })
  
});


export default router;