import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";

import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const authContext = createContext();
const provider = new GithubAuthProvider();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signinWithGitHub = () => {
    setLoading(true);
    return signInWithPopup(auth, provider).then((response) => {
      handleUser(response.user);
    });
  };

  const signout = () => {
    return signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
