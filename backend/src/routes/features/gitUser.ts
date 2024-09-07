import express, { Router } from 'express';
import { extractGitUserDetails } from '../../controllers/features/gitHubExtractor';
import { deleteUser, getAllSortedUser, searchUser, updateUser } from '../../controllers/features/updateAndFetcher';

const router:Router = express.Router();
router.get('/search',searchUser);

router.route('/:username')
.get(extractGitUserDetails)
.delete(deleteUser)
.patch(updateUser)

router.get('/',getAllSortedUser);


export default router;