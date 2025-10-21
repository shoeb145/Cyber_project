import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/auth/verify", {
          withCredentials: true, // 🚀 sends cookies
        });
        console.log(res.data.success, "this is route");

        if (res.data.success) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (auth === null) return <div>Checking authentication...</div>;

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
