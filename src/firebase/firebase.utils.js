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

// firebase setup to store user info
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

// creating to function to collect data from database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>
 {const collectionRef = firestore.collection(collectionKey);
     console.log(collectionRef)
    // Batch focuntion 
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        // setting the doc and newDoRef togeter
        batch.set(newDocRef, obj);
    })
    // to Fire the batch from the database, but using async 
    return await batch.commit() 
};

// converting collentiong to array
export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title , items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

        
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};


export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
