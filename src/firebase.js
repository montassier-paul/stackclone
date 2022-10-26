import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import {signOut} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDvfGISp63mSEikomI9qZCLDyAS3hLtfKY",
    authDomain: "slack-clone-ba85d.firebaseapp.com",
    projectId: "slack-clone-ba85d",
    storageBucket: "slack-clone-ba85d.appspot.com",
    messagingSenderId: "904455091787",
    appId: "1:904455091787:web:e792e659d36bc4b6d1bfce",
    measurementId: "G-FW4HQ8Q9F3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();







const UserSignOut = async () => {

  await signOut(auth).then(() => {

  }).catch((error) => {

  });
}

export  {db, UserSignOut,  auth, googleProvider} ; 