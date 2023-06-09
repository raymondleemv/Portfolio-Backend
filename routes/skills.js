import express from 'express';
import * as database from '../database/database.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('backend add skill');
	try {
		await database.addSkill(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('add skill successful');
});

router.post('/edit', async (req, res) => {
	console.log('backend edit skill');
	try {
		await database.editSkill(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('edit skill successful');
});

router.post('/delete', async (req, res) => {
	console.log('backend delete skill');
	console.log(req.body);
	try {
		await database.deleteSkill(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('delete skill successful');
});

export default router;
