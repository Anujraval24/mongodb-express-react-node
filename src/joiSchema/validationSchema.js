import Joi from 'joi';

import { CONSTANTS } from '../enum';
import { validateRequest } from '../middleware';

const {
	ROLE: { ADMIN, USER, SUPER_USER },
} = CONSTANTS;

const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(6).max(25);

function registerSchema(req, res, next) {
	const schema = Joi.object({
		firstName: firstName.required(),
		lastName: lastName.required(),
		email: email.required(),
		password: password.required(),
	});
	validateRequest(req, res, next, schema);
}

export default {
	registerSchema,
};
