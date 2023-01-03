import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
import sqlite3 from 'sqlite3'
const urlencodedParser = express.urlencoded({extended: false})
import {v4} from 'uuid'

router.post('/upd', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/del', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/get', async (req,res) => {

	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')
	});
	db.serialize(() => {
		const stmt = db.all(`select * from cources`, (err, rows) => {
			if (err) console.log(err)

			console.log(rows)
			res.json(rows)
		})
		console.log(stmt)

	});
	

})

router.post('/add', async (req, res) => {
	console.log(req.body)
	
	
	let name = req.body.name
	let theme = req.body.theme
	let description = req.body.description

	let imgpath = `server/Pictures/${v4()}${path.parse(req.files.file.name).ext}`
	let lecturer_id = req.body.lecturer_id
	req.files.file.mv(imgpath);

	

	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')
	});

	db.serialize(() => {
		const stmt = db.prepare(`insert into cources(name,theme,description,imgpath,lecturer_id) values (?,?,?,?,?)`)
		stmt.run(name,theme,description,imgpath,lecturer_id)
		stmt.finalize();

	});
	db.serialize(() => {
		const stmt = db.all(`select * from cources`, (err, rows) => {
			if (err) console.log(err)

			console.log(rows)
			res.json(rows)
		})
		console.log(stmt)

	});
	

	
})

export default router