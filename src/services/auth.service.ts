// user.service.ts
import supabase from '../integration/supabase.client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signUpUser = async (
  email: string,
  password: string,
  role: string,
  firstName: string,
  lastName: string,
  cpf?: string,
  phone?: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = data?.user;
  if (!user) throw new Error('User sign-up failed');


  // ✅ Insert into profiles (trigger will handle members insert if role is 'member')
  const profileData: any = {
    id: user.id,
    email,
    role,
    first_name: firstName,
    last_name: lastName,
    cpf,
    phone
   // status: 'pending'
  };
console.log('Inserting profileData into Supabase:', profileData);
  const { error: profileInsertError } = await supabase.from('profiles').insert([profileData]);

  if (profileInsertError) {
    console.error('Profile insert error details:', profileInsertError);
    throw new Error('Failed to insert user details: ' + (profileInsertError.message || profileInsertError.details || JSON.stringify(profileInsertError)));
  }

  return user;
};


export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase sign-in error:", error.message);
    throw new Error(error.message);
  }

  if (!data.session) throw new Error('No session returned from Supabase');

  const user = data.user;
  if (!user) throw new Error('User not found after login.');

  // ✅ Fetch user profile from your `profiles` table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, role, email')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) throw new Error('Error fetching profile: ' + profileError.message);
  if (!profile) throw new Error('Profile not found for this user');

  // ✅ Return Supabase legacy JWT (access_token) and user info
  return {
    token: data.session.access_token,
    user: profile,
  };
};

/**
 * Get current user from Supabase legacy JWT.
 */
export const getCurrentUser = async (token: string) => {
  if (!process.env.SUPABASE_JWT_SECRET) throw new Error('SUPABASE_JWT_SECRET not set');

  // Decode Supabase JWT
  const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as any;

  // Supabase puts user id in `sub`
  const userId = decoded.sub;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, role, email')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw new Error('Error fetching user profile: ' + error.message);
  if (!profile) throw new Error('User not found');

  return profile;
};


export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return { message: 'Logged out successfully' };
};
// In user.service.ts
export const inviteUser = async (
  email: string,
  role: string,
  firstName: string,
  lastName: string,
  upline_id?: string,
  cpf?: string,
  phone?: string
) => {
  // Invite user, no password needed here
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
  if (error) throw new Error(error.message);

  // Insert profile data like before
  const profileData = {
    email,
    role,
    first_name: firstName,
    last_name: lastName,
    upline_id: upline_id || null,
    cpf: cpf || null,
    phone: phone || null,
  };

  const { error: profileError } = await supabase.from('profiles').insert([profileData]);
  if (profileError) throw new Error(profileError.message);

  return data;
};

export const changePassword = async (userId: string, newPassword: string) => {
  if (!newPassword || newPassword.length < 6) {
    throw new Error("A nova senha deve conter no mínimo 6 caracteres.");
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) {
    console.error("Erro ao alterar a senha:", error.message);
    throw new Error("Não foi possível alterar a senha.");
  }

  return { message: "Senha alterada com sucesso." };
};
export const requestPasswordReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://hub.agenciafocomkt.com.br/reset-password",
  });

  if (error) {
    console.error("Erro ao enviar e-mail de redefinição:", error.message);
    throw new Error("Não foi possível enviar o link de redefinição.");
  }

  return { message: "Link de redefinição enviado com sucesso." };
};

