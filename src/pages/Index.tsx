import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const Index = () => {
  const { user } = useApp();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default Index;
