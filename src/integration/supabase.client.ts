import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// Static client (without auth)
const supabase = createClient(supabaseUrl, supabaseKey);

// Per-request client with optional access token
export const createSupabaseClient = (accessToken?: string) =>
  createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  });

export default supabase;
