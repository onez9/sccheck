import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
// import DB from '../db.mjs';
import config from'../config/config.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'
const urlencodedParser = express.urlencoded({extended: false})


const db_path = './curs_summer.db'

router.post('/', urlencodedParser, (req, res) => {
  console.log('start login TUPUE GOVNO')
  let db = new sqlite3.Database(db_path, (err)=>{
    console.log(err)
  })

  console.log('hello')

  db.get(`SELECT * FROM users WHERE email = ?`, [req.body.email], function(err, user) {
    console.log('вот это у нас юзер: ', user)
    if (err) return res.status(500).send('Ошибка на сервере.');
    
    if (!user) return res.status(404).send('Пользователь не найден.');




    // console.log('user: ', req.body.password, user.password)
		// проверка пароля пользователя
    console.log('(FJf9erwrje9wjf9Fdfjsfjf9sjfsjwrejworjwerjwlrjwqjr')
    console.log(req.body.password)
    console.log(user.password)

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // если провал шлем это
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
		// иначе отправляем токен
    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    req.session.token = token
    req.session.user_id = user.id
    req.session.email = user.email
    console.log('token: ', token)
    console.log('user: херня которую получили из базы данных: ', user)
    req.session.save()
    // res.status(200).send({ auth: true, token: token, user: user });
    res.send({ auth: true, token: token, user: user });
    // res.redirect('http://localhost:5173/')
  })
})


// module.exports = router;
export default router;
