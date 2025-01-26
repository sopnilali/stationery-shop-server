
import express from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { blogContentValidationSchema } from './blog.validation';

const router = express.Router();

router.post('/', 
    auth(USER_ROLE.user), 
    blogController.createBlogContent,
    validateRequest(blogContentValidationSchema.createblogContentValidationSchema)
)
router.get('/', blogController.getBlogContent)

router.get('/userblogs', auth(USER_ROLE.user), blogController.getBlogContentByAuthorID)

router.get('/details/:id', blogController.getSingleBlogContent)

router.patch('/:id', 
    auth(USER_ROLE.user), 
    blogController.updateBlogContent,
    validateRequest(blogContentValidationSchema.updateblogContentValidationSchema))
router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.deleteBlogContent)


export const blogRoutes = router;