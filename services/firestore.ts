import {
    doc,
    getFirestore,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';

import { app } from '@/services/firebase';

export const db = getFirestore(app);

export type UserProfile = {
  uid: string;
  email: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: 'muscle_gain' | 'weight_loss' | 'strength' | 'fitness';
};

export async function createUserProfile(
  profile: UserProfile,
) {
  await setDoc(
    doc(db, 'users', profile.uid),
    {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  );
}