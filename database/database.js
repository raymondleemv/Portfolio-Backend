import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.MONGODB_URI;
const client = new MongoClient(dbURL);

async function connection() {
	await client.connect();
	let db = client.db(process.env.MONGO_DATABASE);
	return db;
}

async function getCollection(collection, filter = {}) {
	let db = await connection();
	var results = db.collection(collection).find(filter, { photo: 0 });
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
	return await getCollection('skills', {});
}

export { connection, getCareers, getProjects, getSkills };
