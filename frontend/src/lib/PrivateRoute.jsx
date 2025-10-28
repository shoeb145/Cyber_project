import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [auth, setAuth] = useState({
    loading: true,
    success: false,
    role: null,
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/auth/verify", {
          withCredentials: true, // send cookies if using cookie-based auth
        });

        if (res.data.success) {
          setAuth({ loading: false, success: true, role: res.data.user.role });
        } else {
          setAuth({ loading: false, success: false, role: null });
        }
      } catch (error) {
        setAuth({ loading: false, success: false, role: null });
      }
    };

    verifyUser();
  }, []);

  if (auth.loading) return <div>Checking authentication...</div>;

  // 🚫 Not logged in → redirect
  if (!auth.success) return <Navigate to="/login" />;

  // 🚫 Logged in but not authorized for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Logged in and authorized
  return children;
};

export default PrivateRoute;
