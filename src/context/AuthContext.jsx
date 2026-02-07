import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { showError, showSuccess } from "../utils/toast";

/* ---------------- Firebase Setup ---------------- */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

/* ---------------- Context ---------------- */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  /* ---------- Sync user with backend ---------- */
  const syncUserWithBackend = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken();

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  /* ---------- Google Login ---------- */
  const loginWithGoogle = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, provider);
      showSuccess("Logged in successfully!");
      // backend sync handled in onAuthStateChanged
    } catch (err) {
      console.error("Google login failed", err);
      showError("Login failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  /* ---------- Logout ---------- */
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    setUser(null);
    showSuccess("Logged out successfully.");
  };

  /* ---------- Auto login / refresh ---------- */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser && !localStorage.getItem("token")) {
          await syncUserWithBackend(firebaseUser);
        }
        else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Auth sync failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

/* ---------------- Hook ---------------- */

export const useAuth = () => {
  return useContext(AuthContext);
};
