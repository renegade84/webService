import { Router } from 'express';
import * as userController from '../controllers/userController.js'
const users = new Router();

//we only have one api for users, no need to make the URI more complicated.
users.route('/').get(userController.getUserByName);
export default users;