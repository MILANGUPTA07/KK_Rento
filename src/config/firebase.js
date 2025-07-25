import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "demo-api-key",
  authDomain: "rental-website-demo.firebaseapp.com",
  projectId: "rental-website-demo",
  storageBucket: "rental-website-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);