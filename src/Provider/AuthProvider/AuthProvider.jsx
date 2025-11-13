import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    
  // update profile
  const updateUser = (updatedData)=>{
    return updateProfile(auth.currentUser, updatedData)
  } 

  // forget password
  const forgetPassword = ( email ) =>{
    return sendPasswordResetEmail(auth, email)
  }


  // google sign in
  const googleSignIn = (googleProvider)=>{
    return signInWithPopup(auth, googleProvider)
  } 

  


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
    updateUser,
    forgetPassword
  }



  return (
    <AuthContext value={authData}>{ children }</AuthContext>
  )
}

export default AuthProvider;