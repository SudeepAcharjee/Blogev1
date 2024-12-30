import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export let app: FirebaseApp;
let auth: any;

const firebaseConfig = {
  apiKey: "AIzaSyCtlINREAlJH34DAIbGFc0pgNS1vL3svTE",

  authDomain: "blog-f4cda.firebaseapp.com",

  projectId: "blog-f4cda",

  storageBucket: "blog-f4cda.appspot.com",

  messagingSenderId: "605232530796",

  appId: "1:605232530796:web:a7cbb3853907ca6d13df49",

  measurementId: "G-8YFZV1BQGF"
};

try {
  app = getApp('app');
  auth = getAuth(app);
} catch (e) {
  app = initializeApp(firebaseConfig, 'app');
  auth = getAuth(app);
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;

export async function logout() {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user?.user;
  } catch (e: any) {
    throw new Error(e?.code); //auth/invalid-login-credentials
  }
}

export async function signup(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user?.user;
  } catch (e: any) {
    throw new Error(e?.code); //auth/email-already-in-use
  }
}
