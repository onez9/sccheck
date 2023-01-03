import express from 'express';
import path from 'path';
// import {main_data, authChecker} from '../models/model.mjs';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';

const db = new DB("../../curs_summer.db")


router.post('/', function(req, res) {
  db.insertAdmin([ req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8), 1 ], function (err) {
    if (err) return res.status(500).send("Проблемы при регистрации пользователя.")
    
    db.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("Проблемы при получении пользователя.")
      let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
      
			
			res.status(200).send({ auth: true, token: token, user: user });
    });



  }); 
});


// module.exports = router;
export default router;