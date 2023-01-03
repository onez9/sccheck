import express from 'express';
import path from 'path';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
 
const db_path = "../../curs_summer.db"



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
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

export default router;