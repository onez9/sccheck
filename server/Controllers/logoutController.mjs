import express from 'express';
import path from 'path';
const router = express.Router();
import DB from '../db.mjs';
import config from'../config/config.mjs';

const db = "../../curs_summer.db"

router.get('/', (req, res) => {
	if (!req.body) res.sendStatus(500);

	res.render(path.resolve('..', 'views', 'Cources'));
})
// module.exports = router;
export default router;