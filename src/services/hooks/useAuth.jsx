import { useContext } from 'react';

import authContext from '@/services/contexts/authContext';

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
