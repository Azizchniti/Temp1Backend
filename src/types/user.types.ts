export interface User {
  id: string;
  first_name: string;
  last_name:string;
  email: string;
  role: 'admin' | 'member';
  created_at?: string;
  profile_picture:string;
}
