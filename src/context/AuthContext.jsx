import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [isLogedIn, setisLogedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setisLogedIn(localStorage.getItem("userToken"));
    }

    getLoggedUserData();
  }, []);

  


  async function getLoggedUserData(){
    try{
      const {data} = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
          token:localStorage.getItem("userToken"),
        }
      })
      setUserData(data.user)
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLogedIn, setisLogedIn, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
