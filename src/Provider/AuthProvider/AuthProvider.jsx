import { createUserWithEmailAndPassword } from "firebase/auth";
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

   



  const authData = {
    user,
    setUser,
    createUser,
  }



  return (
    <AuthContext value={authData}>{ children }</AuthContext>
  )
}

export default AuthProvider;