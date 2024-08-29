import supabase, { supabaseUrl } from './supabse';

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('Login error occurred', error);
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log('Error in getting user', error);
    throw new Error(error.message);
  }
  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log('Error logging out', error);
    throw new Error(error.message);
  }
};

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    console.log('Error creating user', error);
    throw new Error(error.message);
  }

  return data;
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);

  if (!avatar) return;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarUploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (avatarUploadError) throw new Error(avatarUploadError.message);

  // https://dbphnwbgpyndtfljpwkv.supabase.co/storage/v1/object/public/avatars/avatar-1.png
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateUserError) throw new Error(updateUserError.message);

  return updatedUser;
};
