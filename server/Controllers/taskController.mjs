import express from 'express';
import path from 'path';
const router = express.Router();
// import DB from '../db.mjs';
import config from'../config/config.mjs';
import sqlite3 from 'sqlite3'
const db_path = "../curs_summer.db"
const urlencodedParser = express.urlencoded({extended: false})


router.post('/del', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/upd', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/add', async (req, res) => {
	console.log(req.body)
	// let db = new sqlite3.Database(db_path, (err) => {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	console.log('connect ok')

	// });

	// let stmt = db.prepare('insert into tasks(name,description,answer_task,runtime,cource_id) values (?,?,?,?,?)')
	// stmt.run()





})

export default router;