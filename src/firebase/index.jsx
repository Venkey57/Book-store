import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
// import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCixD1_2ACfqKXrNDO6ixvpz_Eh2mBZu5s",
  authDomain: "book-app-application.firebaseapp.com",
  projectId: "book-app-application",
  storageBucket: "book-app-application.appspot.com",
  messagingSenderId: "606803450237",
  appId: "1:606803450237:web:12d01a6c76b80431a5d414",
  measurementId: "G-85HW46C88D"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);
const storage = getStorage(app);
// const storage = firebase.storage

export { db, storage };
