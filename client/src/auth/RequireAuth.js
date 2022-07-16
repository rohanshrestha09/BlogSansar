import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const newUser = localStorage.getItem('id');

  if (newUser) return children;
  return <Navigate to="/profileauth" />;
};

export default RequireAuth;
