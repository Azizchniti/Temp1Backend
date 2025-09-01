import { Request, Response } from 'express';
import { AnnouncementViewService } from '../services/announcementview.service';

export const AnnouncementViewController = {
  async markViewed(req: Request, res: Response) {
    try {
      const { userId, announcementId } = req.body;
      if (!userId || !announcementId) {
         res.status(400).json({ error: 'Missing userId or announcementId' });
      }

      await AnnouncementViewService.markAsViewed(userId, announcementId);
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUnseenCount(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      console.log('[Controller] userId:', userId); // ✅ Add this
      if (!userId)  res.status(400).json({ error: 'Missing userId' });

      const count = await AnnouncementViewService.getUnseenCount(userId);
      console.log('[Controller] unseen count from service:', count);
      res.status(200).json({ unseenCount: count });
    } catch (error: any) {
       console.error('[Controller Error] getUnseenCount:', error.message);
      res.status(500).json({ error: error.message });
    }
  },
};
