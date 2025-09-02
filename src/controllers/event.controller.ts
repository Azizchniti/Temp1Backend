import { Request, Response } from "express";
import { EventService } from "../services/event.service";

export const EventController = {
  async getAll(req: Request, res: Response) {
    try {
      const events = await EventService.getAll();
      res.json(events);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const event = await EventService.getById(req.params.id);
      if (!event)  res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const event = await EventService.create(req.body);
      res.status(201).json(event);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const event = await EventService.update(req.params.id, req.body);
      res.json(event);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await EventService.delete(req.params.id);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
