import express from 'express';
import * as database from '../database/database.js';

const router = express.Router();

router.post('/add', (req, res) => {
	console.log('backend add skill');
	console.log('outside catch');
	try {
		console.log('inside catch');
		let document = database.addSkill(req.body);
		console.log(document);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('add skill successful');
});

router.post('/edit', (req, res) => {
	console.log('backend edit skill');
	try {
		database.editSkill(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('edit skill successful');
});

router.post('/delete', (req, res) => {
	console.log('backend delete skill');
	console.log(req.body);
	try {
		database.deleteSkill(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('delete skill successful');
});

export default router;
