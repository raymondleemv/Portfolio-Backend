import express from 'express';
import * as database from '../database/database.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('backend add career');
	try {
		await database.addCareer(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('add career successful');
});

router.post('/edit', async (req, res) => {
	console.log('backend edit career');
	try {
		await database.editCareer(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('edit career successful');
});

router.post('/delete', async (req, res) => {
	console.log('backend delete career');
	console.log(req.body);
	try {
		await database.deleteCareer(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('delete career successful');
});

export default router;
