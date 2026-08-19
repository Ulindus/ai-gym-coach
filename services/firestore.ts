import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { app } from '@/services/firebase';

export const db = getFirestore(app);

// -----------------------------
// FITNESS LEVEL
// -----------------------------

export type FitnessLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced';

// -----------------------------
// GOAL
// -----------------------------

export type Goal =
  | 'muscle_gain'
  | 'weight_loss'
  | 'strength'
  | 'fitness';

// -----------------------------
// TRAINING DAYS
// -----------------------------

export type TrainingDays =
  | 2
  | 3
  | 4
  | 5
  | 6;

// -----------------------------
// WORKOUT DURATION
// -----------------------------

export type WorkoutDuration =
  | 20
  | 30
  | 45
  | 60
  | 90;

// -----------------------------
// EQUIPMENT
// -----------------------------

export type Equipment =
  | 'none'
  | 'home'
  | 'basic_gym'
  | 'full_gym';

// -----------------------------
// USER PROFILE
// -----------------------------

export type UserProfile = {
  uid: string;

  email: string;

  name: string;

  age: number;

  height: number;

  weight: number;

  fitnessLevel: FitnessLevel;

  goal: Goal;

  trainingDays: TrainingDays;

  workoutDuration: WorkoutDuration;

  equipment: Equipment;
};

// -----------------------------
// CREATE / UPDATE PROFILE
// -----------------------------

export async function createUserProfile(
  profile: UserProfile,
) {
  const userRef = doc(
    db,
    'users',
    profile.uid,
  );

  await setDoc(
    userRef,
    {
      ...profile,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    },
    {
      merge: true,
    },
  );
}

// -----------------------------
// GET PROFILE
// -----------------------------

export async function getUserProfile(
  uid: string,
): Promise<UserProfile | null> {
  const snapshot = await getDoc(
    doc(db, 'users', uid),
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}