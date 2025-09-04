import supabase from '../integration/supabaseAdmin';

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role, cpf, phone');

  if (error) throw new Error(error.message);
  return data;
};

export const updateUser = async (
  id: string,
  updatedData: { first_name?: string; last_name?: string; email?: string; role?: string }
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updatedData)
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from('profiles').delete().eq('id', id);

  if (error) throw new Error(error.message);
  return { message: 'User deleted successfully' };
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role, cpf, phone')
    .eq('id', id)
    .single(); // ensures only one row

  if (error) throw new Error(error.message);
  return data;
};
