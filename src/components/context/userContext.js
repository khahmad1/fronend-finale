import { useState, createContext } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [signup, setSigningUp] = useState(false);
  const [user, setUser] = useState([]);

  const addToken = (token) => {
    setToken(token);
  };

  const userInfo = (_id, email, name, username, phone, address) => {
    const userObject = {
      _id: _id,
      email: email,
      name: name,
      username: username,
      phone: phone,
      address: address,
    };
    setUser(userObject);
 
  };

  const goSignUp = () => {
    setSigningUp(true);
  };

  return (
    <userContext.Provider
      value={{ token, addToken, signup, goSignUp, user, userInfo }}
    >
      {children}
    </userContext.Provider>
  );
}

export default userContext;
