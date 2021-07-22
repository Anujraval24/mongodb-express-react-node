import express from 'express';

import { userController } from '../controllers';
import { validationSchema } from '../joiSchema';

export default express
	.Router()
	.post('/register', validationSchema.registerSchema, userController.register)
	.get('/',  userController.getAllUsers);
