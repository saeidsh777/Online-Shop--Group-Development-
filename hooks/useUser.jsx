import { useEffect, useState } from 'react';
import { getUserInfo } from '@/services/user'; 
import useToken from '@/hooks/useToken';

const useUser = () => {
  const token = useToken();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const { result } = await getUserInfo(token); 
        setUser(result);
      } catch (err) {
        console.error('Failed to fetch user details', err);
      }
    };
    fetchUser();
  }, [token]);

  return user;
   
};

export default useUser;
