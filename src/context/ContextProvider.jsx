import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import PropTypes from "prop-types";
import usePublicAPI from "../hooks/usePublicAPI";

export const AuthContext = createContext(null);

// providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);

  const axiosPublic = usePublicAPI();

  // create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login user
  const loginUser = (email, password) => {
    setLoader(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleLogin = () => {
    setLoader(true);

    return signInWithPopup(auth, googleProvider);
  };
  // google login
  const githubLogin = () => {
    setLoader(true);

    return signInWithPopup(auth, githubProvider);
  };

  // user logout
  const logout = () => {
    setLoader(true);

    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosPublic
          .post("/api/jwt/token", { email: currentUser?.email })
          .then((res) => {
            if (res.data) {
              localStorage.setItem("jwt-access-token", res.data);
            }
          });
      } else {
        localStorage.removeItem("jwt-access-token");
      }
      setLoader(false);
    });
    () => {
      return unsubscribe;
    };
  }, [axiosPublic]);

  const authentication = {
    createUser,
    loginUser,
    googleLogin,
    githubLogin,
    logout,
    user,
    loader,
  };
  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
