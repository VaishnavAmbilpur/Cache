import { createContext } from 'react';

interface UserContextType {
  login: boolean;
  setlogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;