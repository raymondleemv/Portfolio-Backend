import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		photo: {
			type: String,
		},
	},
	{ collection: 'skills' }
);

const Skill = mongoose.model('Skill', Schema);

export default Skill;
