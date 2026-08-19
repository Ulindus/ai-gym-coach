import {
    addDoc,
    collection,
    serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from '@/services/firebase';

type SaveWorkoutSessionParams = {
  workoutId: string;
  workoutName: string;
  durationMinutes: number;
  completedExercises: number;
  totalExercises: number;
  calories: number;
};

export async function saveWorkoutSession({
  workoutId,
  workoutName,
  durationMinutes,
  completedExercises,
  totalExercises,
  calories,
}: SaveWorkoutSessionParams) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not logged in.');
  }

  const docRef = await addDoc(
    collection(db, 'workoutSessions'),
    {
      uid: user.uid,
      workoutId,
      workoutName,
      durationMinutes,
      completedExercises,
      totalExercises,
      calories,
      completedAt: serverTimestamp(),
    },
  );

  return docRef.id;
}