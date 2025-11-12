import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.config";

//  auth context
export const AuthContext = createContext();

const AuthProvider = ({ children })=>{
  // user statec
  const [user, setUser] = useState(null);
//  loading stae
const [loading, setLoading ]=useState(true)

  // register
  const createUser =(email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
 
  //  login 
  const signIn = (email , password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email , password)
  }
  // log out
  const logOut = ()=>{
    return signOut(auth)
  }

  // google sign in
  const googleSignIn = (googleProvider)=>{
    return signInWithPopup(auth, googleProvider)
  } 

  // update profile
   

  // forget password


  // onAuthStateChanged observer
  useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
     })
     return ()=>{
      unsubscribe()
     }
  },[])
   



  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    googleSignIn,
    loading,
   setLoading,
    logOut ,
  }



  return (
    <AuthContext value={authData}>{ children }</AuthContext>
  )
}

export default AuthProvider;