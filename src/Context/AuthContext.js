import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../Firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    const [user, setuser] = useState();
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, "users", email), {
            savedShows:[],
        })
    }
    function logout(email, password) {
        return signOut(auth, email, password)
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setuser(currentuser);
        })
        return () => {
            unsubscribe();
        }
    })
    return <AuthContext.Provider value={{ signUp, logIn, logout, user }}>{children}</AuthContext.Provider>
}

export function UserAuth() {
    return useContext(AuthContext);
}