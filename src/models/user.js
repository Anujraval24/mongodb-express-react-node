import { Schema, model } from 'mongoose';
import { CONSTANTS } from '../enum';

const {
	ROLE: { ADMIN, USER, SUPER_USER },
} = CONSTANTS;

const userSchema = new Schema(
	{
		firstName: { type: String, index: true },
		lastName: { type: String, index: true },
		email: { type: String, index: true },
		password: { type: String },
		role: {
			type: String,
			index: true,
			enum: [SUPER_USER, ADMIN, USER],
			default: USER,
		},
		isDeleted: { type: Boolean, default: false, index: true },
		isVerified: { type: Boolean, default: false, index: true },
	},
	{ timestamps: true, versionKey: false },
);

const User = new model('User', userSchema);

export default User;
