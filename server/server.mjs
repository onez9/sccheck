import express from 'express'
const urlencodedParser = express.urlencoded({extended: false})
import cookieParser from 'cookie-parser'
// import session from 'express-session'
// import csrf from 'csurf'
import multer from 'multer'
import {v4} from 'uuid'
import path from 'path'
import fileUpload from 'express-fileupload'
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'



// import Record from '../models/Record';
import DB from './db.mjs'
import config from './config/config.mjs'

// const db1 = new DB("../curs_summer.db")
const app = express()
const router = express.Router()

const db = new DB("../curs_summer.db")

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());


// app.use(express.json());
// // app.use(cookieParser('secret key'));
app.use(fileUpload({    
	useTempFiles : true,
	tempFileDir : 'Pictures/'
}));


import loginController from './Controllers/loginController.mjs'
import logoutController from './Controllers/logoutController.mjs'
import registerController from './Controllers/registerController.mjs'
import registeradminController from './Controllers/registeradminController.mjs'
import taskController from './Controllers/taskController.mjs'
import courceController from './Controllers/courceController.mjs'


// CORS middleware
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
}
app.use(allowCrossDomain) // позволяем запросы с разных сайтов

app.use('/login', loginController);
app.use('/logout', logoutController);
app.use('/register', registerController);
app.use('/register-admin', registeradminController);
app.use('/cource', courceController);
app.use('/task', taskController);

app.get('/', (req, res) => {
	res.redirect("http://localhost:5173/")

})

app.get('/reg', (req, res) => {
	res.redirect("http://localhost:5173/reg")

})


/*
	db.serialize(() => {
		const stmt = db.prepare(`insert into users(firstname,secondname,lastname,email,password)values(?,?,?,?,?)`)

		db.run(query, (err, row) => {
			if (err) {
				console.error(err.message);
			}
			console.log(row);
		});
	});
	
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Close the database connection.');
	});





	res.send({"ok": 200})

})



app.post('/adduser', urlencodedParser, function (req,res) {


	console.log(req.body)
	let firstname = req.body.firstname
	let lastname = req.body.lastname
	let secondname = req.body.secondname
	let email = req.body.email
	let group = req.body.group
	let pass1 = req.body.password1
	let pass2 = req.body.password2


	console.log(firstname,secondname,lastname,email,group,pass1,pass2)
	let db = new sqlite3.Database('../curs_summer.db', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('connect ok')

	});

	db.serialize(() => {
		const stmt = db.prepare(`insert into users(firstname,secondname,lastname,email,'group',password)values(?,?,?,?,?,?)`)

		stmt.run(firstname,secondname,lastname,email,group,bcrypt.hashSync(pass1, 8))
		stmt.finalize();




	});
	res.redirect("http://localhost:5173/users")
});
*/


// настройка приложения
// app.set('view engine', 'ejs');
const params = {"port": 3000, "hostname": "localhost"};

app.use('/public', express.static('public'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/private', express.static('private'));

console.log("Server is started...")

//import arr_upload = upload.fields([{ name: 'file', maxCount: 10 }]);
// запуск приложения
app.listen(params.port, params.hostname, () => {
	console.log(`Сервер запущен - http://${params.hostname}:${params.port}/`);
	console.log('Остановить сервер - Ctrl+C');

});
