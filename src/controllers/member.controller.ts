import { Request, Response } from 'express';
import { MemberService } from '../services/member.service';
import { Handler } from 'express';
import { MemberStatus } from '../types/user.types';
// Get all members
export const MemberController = {
async  getAll  (req: Request, res: Response)  {
  try {
    const members = await MemberService.getAllMembers();
    res.json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},

// Get member by id
  getById: (async (req, res) => {
    try {
      const { id } = req.params;
      const member = await MemberService.getMemberById(id);
      if (!member) return res.status(404).json({ error: 'Member not found' });
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }) as Handler,

// Update member
async  update (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedMember = await MemberService.updateMember(id, updatedData);
    res.json(updatedMember);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},

// Delete member
async  delete (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await MemberService.deleteMember(id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},

  getSquad: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const squad = await MemberService.getMemberSquad(id);
      res.json(squad);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getSquadMetrics: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const metrics = await MemberService.getSquadMetrics(id);
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getTopMembers: async (req: Request, res: Response) => {
    try {
      const top = await MemberService.getTopMembers();
      res.json(top);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  // Get top squads
getTopSquads: async (req: Request, res: Response) => {
  try {
    const squads = await MemberService.getTopSquads();
    res.json(squads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},

// Get members by status (pending, approved, rejected)
getByStatus: async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const members = await MemberService.getMembersByStatus(status as MemberStatus);

    res.json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},


// Approve a member (admin action)
approve: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const approved = await MemberService.approveMember(id);
    res.json(approved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},

// Reject a member (admin action)
reject: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rejected = await MemberService.rejectMember(id);
    res.json(rejected);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
},


};
