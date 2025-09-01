import express from 'express';
import { AnnouncementViewController } from '../controllers/announcementviews.controller';

const router = express.Router();

router.post('/mark-viewed', AnnouncementViewController.markViewed);
router.get('/unseen-count/:userId', AnnouncementViewController.getUnseenCount);

export default router;
