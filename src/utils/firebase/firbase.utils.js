import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCwmZpUsCo6RyJ_AUgky-W5OwHq7SZyjpc",
    authDomain: "crwn-clothing-db-f90b2.firebaseapp.com",
    projectId: "crwn-clothing-db-f90b2",
    storageBucket: "crwn-clothing-db-f90b2.appspot.com",
    messagingSenderId: "1076998042964",
    appId: "1:1076998042964:web:14b5e55875b2ac562e04c1"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, provider);
export const signWithGoogleRedirect = () =>
    signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectAndDocument = async (collectionKey, objectToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

}

export const getCategoriesAndDocuMents = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySanpShot = await getDocs(q);
    const categoryMap = querySanpShot.docs.reduce((acc, docSnapShot) => {
        const { title, items } = docSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (
    userAuth,
    addtionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'user', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...addtionalInformation,
            })
        } catch (error) {
            console.log(`error creating the user`, error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
