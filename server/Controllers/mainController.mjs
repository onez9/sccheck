import express from 'express';
import path from 'path';
const router = express.Router();
import config from'../config/config.mjs';


router.get('/', (req,res) => {
	console.log('Вы находитесь в контроллере main!')
	// if (!req.body) res.sendStatus(500);
	// req.session.destroy();
	// res.sendStatus(200)
	//res.redirect('/login');
});

// module.exports = router;
export default router;