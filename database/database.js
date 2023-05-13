import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.MONGODB_URI;
const client = new MongoClient(dbURL);

mongoose
	.connect(dbURL)
	.then(console.log('connected'))
	.catch((err) => console.log(err));

async function addProject(project) {
	const document = await Project.create(project);
	console.log(document);
}

async function editProject(project) {
	console.log(project);
	const document = await Project.findOneAndUpdate(
		{ _id: project._id },
		project
	);
	console.log(document);
	return document;
}

async function deleteProject(projectID) {
	try {
		const document = await Project.deleteOne({ _id: projectID });
		console.log(document);
	} catch (e) {
		console.log(e);
	}
}

async function connection() {
	await client.connect();
	let db = client.db(process.env.MONGO_DATABASE);
	return db;
}

async function getCollection(collection, filter = {}) {
	let db = await connection();
	var results = db.collection(collection).find(filter);
	let res = await results.toArray();
	return res;
}

async function getCareers() {
	return await getCollection('careers');
}

async function getProjects() {
	return await getCollection('projects');
}

async function getSkills() {
	return await getCollection('skills');
}

export {
	connection,
	getCareers,
	getProjects,
	getSkills,
	addProject,
	editProject,
	deleteProject,
};
