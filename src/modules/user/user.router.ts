import express from 'express'
import {  UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();
router.get('/', auth(USER_ROLE.admin), UserController.GetUsers)
router.patch('/:userId', auth(USER_ROLE.admin), UserController.updateUserContent)
router.get('/me', auth(USER_ROLE.user), UserController.GetMe)


export const userRoutes = router;