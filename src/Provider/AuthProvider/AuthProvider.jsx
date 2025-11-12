import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useState } from "react";
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
    return createUserWithEmailAndPassword(auth, email, password)
  }
 
  //  login 
  const signIn = (email , password)=>{
    return signInWithEmailAndPassword(auth,email , password)
  }

  // google sign in
  const googleSignIn = (googleProvider)=>{
    return signInWithPopup(auth, googleProvider)
  }
   



  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    googleSignIn,
  }



  return (
    <AuthContext value={authData}>{ children }</AuthContext>
  )
}

export default AuthProvider;