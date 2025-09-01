import { Router } from 'express';
import { AnnouncementController } from '../controllers/announcement.controller';

const router = Router();

router.get('/', AnnouncementController.getAll);
router.get('/:id', AnnouncementController.getById);
router.post('/', AnnouncementController.create);
router.put('/:id', AnnouncementController.update);
router.delete('/:id', AnnouncementController.delete);

export default router;
