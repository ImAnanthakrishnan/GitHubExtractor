import express, { Router } from 'express';
import { extractGitUserDetails } from '../../controllers/features/gitHubExtractor';

const router:Router = express.Router();

router.get('/:username',extractGitUserDetails);

export default router;