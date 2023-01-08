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
	console.log('test /upd/ cource', req.body)
	console.log(123123123, req.body.name, req.body.theme, req.body.description, req.body.runtime, req.body.id)
	let stmt = db.prepare('update cources set name=?, theme=?, description=?, runtime=? where id=?')
	stmt.run([req.body.name, req.body.theme, req.body.description, req.body.runtime, req.body.id], (err, row)=>{
		console.log(row)
		stmt.finalize()

	})
})

router.post('/del', async (req, res) => {
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect to /cource/del ok')

	});

	let stmt = db.prepare('delete from users_cources where cource_id=? and user_id=?')
	stmt.run([req.body.cource_id, req.session.user_id], (err, rows)=>{
		if (err) console.log(err)
		// let answer = []
		// stmt.finalize()
		// res.json({ok:200})
	})

	stmt=db.prepare('select * from users left join users_cources on users.id=users_cources.user_id left join cources on users_cources.cource_id=cources.id where users.id=? and users_cources.cource_id not null')
	stmt.all([req.body.user_id], (err,rows)=>{
		res.json(rows)
		stmt.finalize()
	})



})

// возврат всех всех курсов
router.post('/getall', urlencodedParser, async (req, res)=>{
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')
	});
	let stmt = db.prepare(`select cources.*, users.email from cources left join users on cources.user_id=users.id`)
	stmt.all([], (err, rows)=>{
		
		if (err) console.log(err)
		let answer = []
		// console.log(rows)
		for (let item of rows) {
			//console.log(item)
			if (item.imgpath===null) {
				answer.push({
					id: item.id,
					name_cource: item.name,
					theme_cource: item.theme,
					description_cource: item.description,
					runtime_cource: item.runtime,
					user_id: item.user_id,
					author: item.email,
					imgpath: 'server/Pictures/e557e870-e841-4263-b55c-86131d8aaf55.jpg',

				})
			} else {
				answer.push({
					id: item.id,
					name_cource: item.name,
					theme_cource: item.theme,
					description_cource: item.description,
					runtime_cource: item.runtime,
					user_id: item.user_id,
					author_cource: item.email,
					imgpath: item.imgpath,

				})
			}
		}

		console.log('own cources: ', answer)
		res.status(200).json(answer)
	})
})

router.post('/add_subscribe_on_cource', urlencodedParser, async (req,res)=>{
	
	let db=new sqlite3.Database('../curs_summer.db', (err)=>{
		if(err) console.log(err)
	})

	let stmt=db.prepare('insert into users_cources(user_id,cource_id)values(?,?)')
	stmt.run([req.session.user_id,req.body.cource_id], (err,rows)=>{
		console.log(rows)
		res.json({ok: 200})
		stmt.finalize()
	})
})

router.post('/get_my_subscribe_cource', urlencodedParser, async (req,res)=>{
	console.log('1 когда получаем мои подписки на курсы: ', req.session)
	// req.session.token = 'aaa aa aaa'
	console.log('2 подписки на курсы: ', req.session)
	// req.session.save()
	
	let db=new sqlite3.Database('../curs_summer.db', (err)=>{
		if(err) console.log(err)
	})

	// получаем список всех курсов пользователя которые он не прошёл
	let stmt=db.prepare(`select * from (select user_id as uid, cource_id from users_cources
		except 
		select user_id as uid, cource_id from grades) as r1
		left join cources on r1.cource_id=cources.id
		left join users on r1.uid=users.id
		where users.id=?;`)
	stmt.all([req.session.user_id], (err,rows)=>{
		// console.log('rows 1231231', rows)
		res.json(rows) // ошибка была в том что у нас 2 раза выполнялось то что не должно выполняться
		stmt.finalize()
		// req.session.save()
	})
})


// получение пользоваателем только тех которые он создал
router.post('/get_own_cource', urlencodedParser, async (req,res) => {
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) console.log(err)
	});
	
	let stmt = db.prepare(`select * from cources where cources.user_id=?`)
	stmt.all([req.session.user_id], async (err, rows) => {
		if (err) console.log(err)

		let answer = []
		// console.log(rows)
		for (let item of rows) {
			//console.log(item)
			answer.push({
				id: item.id,
				name_cource: item.name,
				theme_cource: item.theme,
				description_cource: item.description,
				runtime_cource: item.runtime,
				user_id: item.user_id,
				imgpath: item.imgpath,

			})
		}
		console.log('user_id: ', req.session.user_id)
		// console.log('user_id: ', req.session.user_id)
		console.log('answer can be tthis place: ', answer)
		
		res.status(200).json(answer)
	});
	// console.log('anime 123 123 123', ccc.all())
	


})

router.post('/create', urlencodedParser, async (req, res) => {
	console.log(req.body)
	
	
	let name = req.body.name
	let theme = req.body.theme
	let description = req.body.description
	// let email = req.body.email
	let runtime = req.body.runtime
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

	// req.files.file.mv(imgpath);
	console.log(req.files?.file)

	

	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')
	});

	//вставили новый курс
	db.serialize(() => {
		// тут просто создается курс с указанием - кто его создал
		let stmt = db.prepare(`insert into cources(name,theme,description,runtime,imgpath,user_id) values (?,?,?,?,?,?)`)
		stmt.run(name,theme,description,runtime,imgpath,req.session.user_id)
		stmt.finalize();
	});
	
	// вернули все курсы для конкретного польлзователя
	db.serialize(() => {
		const stmt = db.prepare('select * from cources where user_id=?')
		stmt.all([req.body.user_id], (err, rows) => {
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
					runtime_cource: item.runtime,
					user_id: item.user_id,
					imgpath: item.imgpath,

				})
			}
			res.json(answer)
		})
		console.log(stmt)

	});
	

	
})

export default router