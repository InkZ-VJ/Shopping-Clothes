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
} from 'firebase/firestore';

import { FIREBASE_KEY } from './firebase.key';

const firebaseConfig = {
    apiKey: FIREBASE_KEY.apiKey,
    authDomain: FIREBASE_KEY.authDomain,
    projectId: FIREBASE_KEY.projectId,
    storageBucket: FIREBASE_KEY.storageBucket,
    messagingSenderId: FIREBASE_KEY.messagingSenderId,
    appId: FIREBASE_KEY.appId,
}

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
    return querySanpShot.docs.map(docSnapshot => docSnapshot.data());

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
