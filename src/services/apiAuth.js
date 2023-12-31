import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
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
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  // console.log(data);
  return data;
}

// Anmerkung:
// die Response vom Server von Database ist eine Session - wenn kein Fehler geworfen wurde
// diese Session enthält:
// - einen access_token mit Angaben, wielange der Token gilt, wann er ausläuft und von welchem Typus er ist
// - ein refresh-token
// - die Daten des users:
//   - id
//   - aud, d.h. ob dieser bereits authentifiziert ist
//   - confirmed_at, d.h. wann er authentifiziert wurde
//   - created_at
//   - email
//   - email_confirmed_at
//   - role, d.h. ob der user authentifiziert ist
//  etc.

// diese Session wird von Supabase in den local Storage des jeweiigen Browsers gespeichert
// hierin kann man die user-Daten abrufen
// bei jedem Request an Supabase wird die session, insbesondere der access-token, mitgeschickt, um Zugriff
// auf Daten von Supabase zu erlangen

// Bei späterem Zugriff auf die App
export async function getCurrentUser() {
  // Überprüfung, ob der local Storage des Browsers eine gültige Session hat
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // obwohl hier eine Session im local Storage gespeichert ist, ist ein erneuter Abruf des Users vom Server sicherer
  const { data, error } = await supabase.auth.getUser();

  // console.log(data);
  if (error) throw new Error(error.message);

  return data?.user;
}

// Es wird die Session des Users mit diversen Daten als Response zurückgegeben
// hier interessiert aber nur der User selbst und nicht der JWT-Token etc.

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1.Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateCurrentUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // 3. Update avatar in the user

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
