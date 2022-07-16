import UserContext from './userContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAuth = ({ children }) => {
  const id = localStorage.getItem('id');
  const [user, setUser] = useState();
  const [login, setLogin] = useState(false);

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('id');
    window.location.reload();
  };

  useEffect(() => {
    const fetchedData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${id}`,
        },
      };

      try {
        const res = await axios.get('/api/user/authorise', config);
        if (res.status === 201) {
          setUser(res.data);
        }
      } catch (err) {
        localStorage.removeItem('id');
      }
    };

    fetchedData();
  }, [id, login]);

  return (
    <UserContext.Provider value={{ user, setLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserAuth;
