
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAuth = () => {
  const { currentUser, isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  return {
    user: currentUser,
    isLoggedIn,
    isAdmin: currentUser?.isAdmin || false,
  };
};
