// import { useSelector } from "react-redux"
// const AuthAdmin = ({ children }) => {
//     const user = useSelector(state => state.user)
//     const token = localStorage.getItem('user')
//     if (user.user && token) {
//         return children
//     }
// }

// export default AuthAdmin

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthAdmin = ({ children }) => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("user");

  // ✅ Check if user and token exist
  if (user?.user && token) {
    return children; // allow access
  }

  // 🚫 If not authorized, redirect to login
  return <Navigate to="/login" replace />;
};

export default AuthAdmin;
