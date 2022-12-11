import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
export const UserContext = createContext({ user: null });
export default (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null || user != undefined) {
        console.log(user);
        const displayName = user.displayName;
        const email = user.email;
        setuser({
          displayName,
          email,
        });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
