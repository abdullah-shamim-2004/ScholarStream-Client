import {
    createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { AuthContext } from "../AuthContext/AuthContext";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //This function will look after the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  //Component for update user profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //Component for signIn user with email and password
  const UserSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Component for signIn user with email and password
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Component for signOut user
  const UserSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const AuthInfo = {
    createUser,
    user,
    setUser,
    updateUser,
    loading,
    UserSignIn,
    googleSignIn,
    UserSignOut,
  };

  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;