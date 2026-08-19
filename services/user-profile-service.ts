import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';

import { auth, db } from '@/services/firebase';

import type { UserProfile } from '@/models/user-profile';

export async function saveUserProfile(
  profile: Omit<
    UserProfile,
    'uid' | 'createdAt' | 'updatedAt'
  >,
) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not logged in.');
  }

  const userRef = doc(db, 'users', user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      ...profile,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  return user.uid;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const userRef = doc(db, 'users', user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}