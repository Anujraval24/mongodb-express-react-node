import express from 'express';

import { userController } from '../controllers';
import { validationSchema } from '../joiSchema';

export default express
	.Router()
	.post('/register', validationSchema.registerSchema, userController.register)
	.get('/', userController.getAllUsers)
	.put('/status', userController.updatestatus)
	.put('/update', validationSchema.updateSchema, userController.updateUser)
	.put('/status', userController.updatestatus);
