import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		content: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		github: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
		},
	},
	{ collection: 'projects' }
);

const Project = mongoose.model('Project', Schema);

export default Project;
