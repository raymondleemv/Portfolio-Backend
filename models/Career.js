import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		career: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: String,
			required: true,
		},
		start_date: {
			type: String,
			required: true,
		},
		end_date: {
			type: String,
		},
		career_type: {
			type: String,
			required: true,
		},
		skills: {
			type: Array,
		},
		photo: {
			type: String,
		},
	},
	{ collection: 'careers' }
);

const Career = mongoose.model('Career', Schema);

export default Career;
