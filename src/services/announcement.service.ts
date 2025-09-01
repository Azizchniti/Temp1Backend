import supabase from '../integration/supabase.client';
import { Announcement } from '../types/Announcement';

export const AnnouncementService = {
  async getAllAnnouncements(): Promise<Announcement[]> {
    const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as Announcement[];
  },

  async getAnnouncementById(id: string): Promise<Announcement | null> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data as Announcement | null;
  },

  async createAnnouncement(announcementData: Partial<Announcement>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData])
      .single();
    if (error) throw error;
    return data as Announcement;
  },

  async updateAnnouncement(id: string, updatedData: Partial<Announcement>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .update(updatedData)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Announcement;
  },

  async deleteAnnouncement(id: string): Promise<void> {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) throw error;
  }
};
