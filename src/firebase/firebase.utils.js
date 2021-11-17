import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyClE-rLBcFXs0R-UD9bv17mGskdreKXmqQ",
    authDomain: "crwn-db-c35a1.firebaseapp.com",
    projectId: "crwn-db-c35a1",
    storageBucket: "crwn-db-c35a1.appspot.com",
    messagingSenderId: "786744926441",
    appId: "1:786744926441:web:9c0226352ca045c3311078",
    measurementId: "G-Z09B1839PL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

         try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
         } catch(error) {
            console.log('error creating user', error.message);
         }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;