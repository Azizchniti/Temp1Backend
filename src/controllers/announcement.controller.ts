import { Request, Response } from 'express';
import { AnnouncementService } from '../services/announcement.service';
import { Handler } from 'express';

export const AnnouncementController = {
  async getAll(req: Request, res: Response) {
    try {
      const announcements = await AnnouncementService.getAllAnnouncements();
      res.json(announcements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: (async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await AnnouncementService.getAnnouncementById(id);
      if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
      res.json(announcement);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }) as Handler,

  async create(req: Request, res: Response) {
    try {
      const newAnnouncement = await AnnouncementService.createAnnouncement(req.body);
      res.status(201).json(newAnnouncement);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await AnnouncementService.updateAnnouncement(id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AnnouncementService.deleteAnnouncement(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
