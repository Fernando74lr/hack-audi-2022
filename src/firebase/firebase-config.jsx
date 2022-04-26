// Import the needed functions from the SDKs.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import 'firebase/firestore';
import 'firebase/auth';

// Firebase configuration
import { firebaseConfig } from './secret';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
