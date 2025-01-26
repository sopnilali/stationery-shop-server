import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { adminController } from './admin.controller';


const router = express.Router();

router.patch('/users/:userId/block', auth(USER_ROLE.admin), adminController.AdminBlockUser)
router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.DeleteBlogContentFromAdmin)

export const AdminRoutes = router;