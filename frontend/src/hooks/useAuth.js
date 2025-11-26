import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
} from '../redux/selectors/authSelectors';

const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
  };
};

export default useAuth;
