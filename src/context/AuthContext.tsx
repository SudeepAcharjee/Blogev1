import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'api/firebase';

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
  uid: null as string | null,
  init: false as boolean,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  // For the purpose of displaying a loader before checking auth (prior to initialization).
  const [init, setInit] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const stopListen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
      setInit(true);
    });

    return () => stopListen();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        uid: currentUser?.uid || null,
        init,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
