import express from 'express'
import {  UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();
router.get('/', auth(USER_ROLE.admin), UserController.GetUsers)
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.GetMe)


export const userRoutes = router;