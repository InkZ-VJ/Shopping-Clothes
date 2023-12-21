import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firbase.utils";

const SignIn = () => {
  useEffect(() => {
    async function getRedirect() {
      const response = await getRedirectResult(auth);
      console.log(response);
      if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    getRedirect();
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    // console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signWithGoogleRedirect}>
        Sign in with Google REdirect
      </button>
    </div>
  );
};

export default SignIn;
