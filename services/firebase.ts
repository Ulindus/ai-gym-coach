import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASULLIhe0NSOcKEgVqYv8XFp-CXqxHmgo',
  authDomain: 'ai-gym-coach-b9626.firebaseapp.com',
  projectId: 'ai-gym-coach-b9626',
  storageBucket: 'ai-gym-coach-b9626.firebasestorage.app',
  messagingSenderId: '38480270243',
  appId: '1:38480270243:web:611bcb9658b9fc3f8d8016',
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

const auth = getAuth(app);

export { app, auth };
