export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
  created_by?: string;
  created_at?: string;
}
