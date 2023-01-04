import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
import sqlite3 from 'sqlite3'
const urlencodedParser = express.urlencoded({extended: false})
import {v4} from 'uuid'

router.post('/upd', urlencodedParser, async (req, res) => {
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect update ok')

	});
	console.log(123123123, req.body.name, req.body.theme, req.body.description, req.body.id)
	let stmt = db.prepare('update cources set name=?, theme=?, description=? where id=?')
	stmt.run([req.body.name, req.body.theme, req.body.description, req.body.id], (err, row)=>{
		console.log(row)
		stmt.finalize()

	})
})

router.post('/del', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/get', urlencodedParser, async (req,res) => {

	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')
	});
	db.serialize(() => {
		const stmt = db.prepare('select * from cources where lecturer_id=?')
		
		stmt.all([req.body.id], (err, rows) => {
			if (err) console.log(err)
			let answer = []
			// console.log(rows)
			for (let item of rows) {
				console.log(item)
				answer.push({
					id: item.id,
					name_cource: item.name,
					theme_cource: item.theme,
					description_cource: item.description,
					lecturer_id: item.lecturer_id,
					imgpath: item.imgpath,

				})
			}


			res.json(answer)
		})
		console.log(stmt)

	});
	

})

router.post('/add', urlencodedParser, async (req, res) => {
	console.log(req.body)
	
	
	let name = req.body.name
	let theme = req.body.theme
	let description = req.body.description
	let imgpath

	try {
		console.log('test: ', req.files.file)
		imgpath = `server/Pictures/${v4()}${path.parse(req.files.file.name).ext}`
		req.files.file.mv(imgpath);
	}
	catch
	{
		imgpath = undefined
		console.log(imgpath)
	}
	let lecturer_id = req.body.lecturer_id
	// req.files.file.mv(imgpath);
	console.log(req.files?.file)

	

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
		const stmt = db.prepare('select * from cources where lecturer_id=?')
		stmt.all([req.body.lecturer_id], (err, rows) => {
			if (err) console.log(err)

			//console.log(rows)

			let answer = []
			// console.log(rows)
			for (let item of rows) {
				console.log(item)
				answer.push({
					id: item.id,
					name_cource: item.name,
					theme_cource: item.theme,
					description_cource: item.description,
					lecturer_id: item.lecturer_id,
					imgpath: item.imgpath,

				})
			}
			res.json(answer)
		})
		console.log(stmt)

	});
	

	
})

export default router