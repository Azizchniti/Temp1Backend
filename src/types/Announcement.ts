export type AnnouncementType = 'news' | 'notice' | 'announcement';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  publish_date: Date;
  expiry_date?: Date;
  is_published: boolean;
  is_highlighted: boolean;
  author_id: string;
  created_at: Date;
  updated_at: Date;
}
