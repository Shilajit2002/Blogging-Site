import React, { useState } from "react";
// Import UserContext
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState(null);
  const [perBlog, setPerBlog] = useState(null);

  return (
    // UserContext Provider Wrapper
    // Setting Value with User State
    <UserContext.Provider value={{ user, setUser, perBlog, setPerBlog }}>
      {/* Children */}
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
