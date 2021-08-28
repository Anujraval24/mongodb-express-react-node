import { hash, genSalt } from 'bcrypt';

const saltRounds = 10;
const hashPassword = async (password) => {
	// Generate a salt at level 10 strength
	const salt = await genSalt(saltRounds);
	const hashPassword = await hash(password, salt);
	return hashPassword;
};

export default hashPassword;
