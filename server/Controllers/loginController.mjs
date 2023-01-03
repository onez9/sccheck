import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const urlencodedParser = express.urlencoded({extended: false})
const db = new DB("../curs_summer.db")

router.post('/', urlencodedParser, (req, res) => {
  console.log('start login')
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Ошибка на сервере.');
    
    if (!user) return res.status(404).send('Пользователь не найден.');
    console.log('user is user is user is user is user: ', req.body.password, user.password)
		// проверка пароля пользователя
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // если провал шлем это
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
		// иначе отправляем токен
    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    
    res.status(200).send({ auth: true, token: token, user: user });
  });
})


// module.exports = router;
export default router;