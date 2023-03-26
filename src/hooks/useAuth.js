import { auth } from '../firebase';

const useAuth = () => {
  return new Promise((res, rej) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        res(user);
      } else {
        rej('User not logged in');
      }
    });
  });
};

export default useAuth;
