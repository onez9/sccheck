import express from 'express';
import path from 'path';
const router = express.Router();
import DB from '../db.mjs';
import config from '../config/config.mjs';

const db_path = './curs_summer.db'
const urlencodedParser = express.urlencoded({extended: false})

router.post('/', urlencodedParser, async (req, res) => {
  req.session.startTime = new Date().getTime()
  req.session.save()

  res.json({startTime: req.session.startTime})
})




// module.exports = router;
export default router;