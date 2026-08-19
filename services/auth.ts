import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth';

import { auth } from '@/services/firebase';

export async function registerUser(
  email: string,
  password: string,
) {
  return createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
}

export async function loginUser(
  email: string,
  password: string,
) {
  return signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
}

export async function logoutUser() {
  return signOut(auth);
}

export function subscribeToAuth(
  callback: (user: User | null) => void,
) {
  return onAuthStateChanged(auth, callback);
}