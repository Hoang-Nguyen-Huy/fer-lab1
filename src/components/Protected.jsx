import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Protected({ children }) {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/fer-lab1/' />;
  }
  return children;
}
