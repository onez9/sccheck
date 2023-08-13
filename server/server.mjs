//process.chdir(__dirname);
// console.log(__dirname)
import express from 'express'
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
import session from 'express-session';
import cors from 'cors'
import crypto from 'crypto'

// import Record from '../models/Record';
import DB from './db.mjs'

// const db1 = new DB("../curs_summer.db")
const app = express()
// const router = express.Router()

// const db = new DB("../curs_summer.db")

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const urlencodedParser = express.urlencoded({extended: false})
// app.use(urlencodedParser)

// настройка приложения
app.use(express.json());
// // app.use(cookieParser('secret key'));
app.use(fileUpload({    
	useTempFiles : true,
	tempFileDir : 'Pictures/'
}));




// CORS middleware
const allowCrossDomain = function(req, res, next) {
	// console.log('middleware token that: ', req.session.token)
	
	// res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
}
app.use(allowCrossDomain) // позволяем запросы с разных сайтов



import loginController from './Controllers/loginController.mjs'
import logoutController from './Controllers/logoutController.mjs'
import registerController from './Controllers/registerController.mjs'
import registeradminController from './Controllers/registeradminController.mjs'
import taskController from './Controllers/taskController.mjs'
import courceController from './Controllers/courceController.mjs'
import userController from './Controllers/userController.mjs'
import answerController from './Controllers/answerController.mjs'
import config from './config/config.mjs'
import courceTimeController from './Controllers/courceTimeController.mjs'


const corsOptions = {
	origin: 'http://192.168.1.9:5173',  //Your Client, do not write '*'
	credentials: true,
};
app.use(cors(corsOptions));


app.use(cookieParser());
app.set('trust proxy', 1)
app.use(session({
  resave: false,
  saveUninitialized: true,
	secret: 'keyboard cat',
	// name: '123',
	// secret: "anyrandomstring",
	// cookie: {
  //   maxAge:269999999999
  // },
	cookie: { 
		secure: false,
		// originalMaxAge: 3600,
		// path: '/'
	}
}))

// app.use((req, res, next) => {
//   if (req.headers.authorization) {
//     let tokenParts = req.headers.authorization.split('.')
//     let signature = crypto.createHmac('SHA256', config.secret).update(`${tokenParts[0]}.${tokenParts[1]}`).digest('base64')
// 		console.log('signature: ', signature)
// 		console.log('tokenParts[0]: ', tokenParts[0])
// 		console.log('tokenParts[1]: ', tokenParts[1])
//     if (signature === tokenParts[2]) {
			
//       req.user = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'))
// 			console.log('middleware.................', req.user)
// 		} else {
// 			console.log('ничего не произошло!')
// 		}
// 		console.log('у нас тут много секса!')
//     next()
//   } else {
// 		console.log('опять ничего не произошло')
// 		// res.redirect(300, 'http://localhost:5173/login')
// 		next()
// 	} 

//   // next()
// })

// app.use(express.json())
app.use((req, res, next) => {
	// console.log('headers request: ', req.headers)
	// console.log('my coockie is: ', req.cookies)
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, config.secret, (err, payload) => {
				// console.log('this is payload blad suka tupaya: ', payload)
			if (err) {
				// console.log(err)
				return next()
				// res.send(500)
			} else if (payload) {
				// console.log('бляяяяяяяяяяяяяяяяяяяяяяяяяяяяяяя ааааа')
				if (req.session.user_id === payload.id) {
					req.user = req.session.email
					// console.log('Все прошло успешно!!!!!!!!!!!!!!')
					return next()
				}
				// res.send(200)
				if (!req.user) return next()
			}


    })
  } else {
		return next()
	}


})



// app.use('*', main)
app.get('*', (req, res)=>{
	console.log('hello')
	res.sendFile(path.resolve('index.html'))
})

app.use('/login', loginController);
app.use('/logout', logoutController);
app.use('/register', registerController);
app.use('/register-admin', registeradminController);
app.use('/cource', courceController);
app.use('/task', taskController);
app.use('/user', userController);
app.use('/answer', answerController);
app.use('/cource_time', courceTimeController);


// const ip='192.168.0.105'
// const port=3000
// const url=`http://${ip}:5173`


// app.get('/', (req, res) => {
// 	res.redirect(url)

// })

// app.get('/reg', (req, res) => {
// 	res.redirect(`${url}/reg`)

// })

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


app.use('/public', express.static('public'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/private', express.static('private'));

console.log("Server is started...")

//import arr_upload = upload.fields([{ name: 'file', maxCount: 10 }]);
// запуск приложения
app.listen(config.port, config.host, () => {
	console.log(`Сервер запущен - http://${config.host}:${config.port}/`);
	console.log('Остановить сервер - Ctrl+C');

});
