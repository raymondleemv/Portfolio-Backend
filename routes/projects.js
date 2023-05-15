import express from 'express';
import * as database from '../database/database.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('backend add project');
	try {
		await database.addProject(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('add project successful');
});

router.post('/edit', async (req, res) => {
	console.log('backend edit project');
	try {
		await database.editProject(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('edit project successful');
});

router.post('/delete', async (req, res) => {
	console.log('backend delete project');
	console.log(req.body);
	try {
		await database.deleteProject(req.body);
	} catch (e) {
		return res.status(400).send(e);
	}
	res.send('delete project successful');
});

export default router;
