import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GithubAuthProvider();
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log(user);

  const signinWithGithub = () => {
    return signInWithPopup(auth, provider).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    // return () => unsubscribe();
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
    });
    return unsubscribe;
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}
