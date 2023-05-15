import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as database from '../database/database.js';
import projectsRouter from '../routes/projects.js';
import careersRouter from '../routes/careers.js';
import skillsRouter from '../routes/skills.js';
import { sendMail } from './gmail.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(
	cors({
		origin: '*',
	})
);

app.get('/api', async (req, res) => {
	res.send('This is the the portfolio backend server');
});

app.get('/api/careers', async (req, res) => {
	let careers = await database.getCareers();
	res.send(careers);
});

app.get('/api/projects', async (req, res) => {
	let projects = await database.getProjects();
	res.send(projects);
});

app.get('/api/skills', async (req, res) => {
	let skills = await database.getSkills();
	res.send(skills);
});

app.post('/api/email', async (req, res) => {
	let status = await sendMail(req.body);
	res.send(status);
});

app.use('/api/projects/', projectsRouter);
app.use('/api/careers/', careersRouter);
app.use('/api/skills/', skillsRouter);

app.listen(port, () => {
	console.log(`app listening on ${port}`);
});

export default app;
