import supabase from '../integration/supabase.client';

export const AnnouncementViewService = {
  async markAsViewed(userId: string, announcementId: string) {
    const { data, error } = await supabase
      .from('announcement_views')
      .upsert([{ user_id: userId, announcement_id: announcementId }], {
        onConflict: 'user_id,announcement_id',
      });

    if (error) throw error;
    return data;
  },

  async getViewedAnnouncementIdsByUser(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('announcement_views')
      .select('announcement_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map((view) => view.announcement_id);
  },

  async getUnseenCount(userId: string): Promise<number> {
    const { data: allAnnouncements, error: annError } = await supabase
      .from('announcements')
      .select('id');
 console.log('[Service] getUnseenCount called with userId:', userId);
    if (annError) throw annError;

    const { data: seenViews, error: viewsError } = await supabase
      .from('announcement_views')
      .select('announcement_id')
      .eq('user_id', userId);

    if (viewsError) throw viewsError;

    const seenIds = new Set(seenViews.map((v) => v.announcement_id));
    const unseenCount = allAnnouncements.filter(
      (ann) => !seenIds.has(ann.id)
    ).length;
 console.log('[Service] count from DB:', unseenCount);
    return unseenCount;
  },
};
