import { userService } from '../mongoServices';
import { errorLogger, hashPassword } from '../utils';
import { userModel } from '../models';

const getAllUsers = async (req, res) => {
	try {
		const { query } = req;
		const { totalCount, users } = await userService.findAllQuery(query);

		res.status(200).send({
			success: true,
			data: users,
			totalCount,
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};
const register = async (req, res) => {
	try {
		const { body } = req;
		const { email, password } = body;
		let data;
		const query = { email };

		// Check User Exists or Not
		const checkUser = await userService.userQuery(query);

		if (checkUser)
			throw {
				email: 'This email address is already in use',
			};

		// Password Hash
		const hashed = await hashPassword(password);

		// Generate Email VerifyToken
		data = {
			...body,
			password: hashed,
		};

		// Save User into DB
		const user = new userModel(data);
		const saveUser = await user.save();

		if (!saveUser) throw new Error('Error While Saving User');
		saveUser &&
			res.status(200).send({
				success: true,
				message: 'User Registered Successfully.',
			});
	} catch (error) {
		// Check for Duplication in Model
		if (error && error.code === 11000) {
			error.message = {
				[Object.keys(error.keyPattern)]: `This ${Object.keys(error.keyPattern)}  already in use.`,
			};
			error.status = 409;
		}
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message || error,
		});
	}
};
const updateUser = async (req, res) => {
	try {
		console.log(`req.body`, req.body);
		const { _id } = req.body;
		const data = await userService.findOneAndUpdateQuery(req?.body, _id);
		data &&
			res.status(200).send({
				success: true,
			});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};
const updatestatus = async (req, res) => {
	try {
		const { status, _id } = req.body;
		const update = { isActive: status };
		const data = await userService.findOneAndUpdateQuery(update, _id);
		data &&
			res.status(200).send({
				success: true,
			});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

export default { getAllUsers, register, updateUser, updatestatus };
