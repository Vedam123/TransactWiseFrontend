// hooks/useAuth.js
import { useState } from "react";

function useAuth() {
  const [token, setToken] = useState(""); // Initialize token state
  // Other authentication-related states or functions can be added here

  return { token, setToken };
}

export default useAuth;
