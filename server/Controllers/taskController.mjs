import express from 'express';
const router = express.Router();
import sqlite3 from 'sqlite3'
const db_path = "../curs_summer.db"
const urlencodedParser = express.urlencoded({extended: true})


router.post('/del', async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});
})

router.post('/upd', urlencodedParser, async (req, res) => {
	console.log('upd: ', req.body)
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connection ok')

	});

	// let arr = []
	// for (let key in req.body) {
	// 	arr.push(key)
	// 	console.log(key, req.body[key])
	// }
	let stmt
	switch (parseInt(req.body.number)) {
		case 1:
			stmt = db.prepare('update tasks set ntask=? where id=?')
			stmt?.run([req.body.ntask, req.body.id], (err, row) => {
				console.log(row)
				stmt.finalize()
			})

			break;
		case 2:
			stmt = db.prepare('update tasks set dtask=? where id=?')
			stmt?.run([req.body.dtask, req.body.id], (err, row) => {
				console.log(row)
				stmt.finalize()
			})

			break;
		case 3:
			stmt = db.prepare('update tasks set answer_task=? where id=?')
			stmt?.run([req.body.answer_task, req.body.id], (err, row) => {
				console.log(row)
				stmt.finalize()
			})

			break;
		case 4:
			stmt = db.prepare('update tasks set runtime=? where id=?')
			stmt?.run([req.body.runtime, req.body.id], (err, row) => {
				console.log(row)
				stmt.finalize()
			})
			break;

	}


	// let one = arr[1]
	// let two = req.body[arr[1]]
	// let three = req.body[arr[0]]

	console.log('stmt: ', stmt)

})

router.post('/get', urlencodedParser, async (req, res) => {
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});

	let stmt = db.prepare('select * from tasks where cource_id=?')
	stmt.all(req.body.id, (err, row) => {
		console.log('id=1', row)
		stmt.finalize()
		res.json(row)
	})
})

router.post('/add', urlencodedParser, async (req, res) => {
	console.log(req.body)
	let db = new sqlite3.Database(db_path, (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});

	let stmt = db.prepare('insert into tasks(ntask,dtask,answer_task,runtime,cource_id) values (?,?,?,?,?)')
	stmt.run(req.body.ntask, req.body.dtask, req.body.answer_task, req.body.runtime, req.body.id)
	stmt.finalize()

	stmt = db.prepare('select * from tasks')
	stmt.all([], (err, rows)=>{
		console.log(rows)
		res.json(rows)
	})
	stmt.finalize()


	



})

export default router;