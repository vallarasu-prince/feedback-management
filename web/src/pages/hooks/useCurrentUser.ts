import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const useCurrentUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("fmToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          console.log("Token has expired");
          localStorage.removeItem("fmToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return user;
};

export default useCurrentUser;
