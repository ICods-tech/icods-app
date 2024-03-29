import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import React, {
  createContext,
  useCallback, useContext,
  useEffect, useState
} from 'react';
import { LOG } from '../config';
import api from '../services/api';
const log = LOG.extend('Auth');

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  visibility: boolean;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface AuthContextData {
  user: User;
  token: string;
  isLoading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser(user: User): void;
  deleteUser: (token: string) => Promise<void>;
  alterProfileVisibility: (id: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const validatorToken = useCallback(async () => {
    try {
      await api.get('/validator-token');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const loadStorageData = async () => {
    try {
      const [token, user] = await AsyncStorage.multiGet([
        '@ICods:token',
        '@ICods:user',
      ]);

      if (!token[1] || !user[1]) {
        setIsLoading(false);
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token[1]}`;
    
      await validatorToken();  
      const userId = JSON.parse(user[1])
      setData({ token: token[1], user: userId });
      setIsLoading(false);
    } catch (error) {
      log.error(error);
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    loadStorageData();

  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      const { email, password } = credentials;

      const res = await api.post('signin', {
        email,
        password,
      });
      const { token, user } = res.data;

      await AsyncStorage.multiSet([
        ['@ICods:token', token],
        ['@ICods:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await analytics().setUserId(user.id);

      setData({ token, user });
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const { name, username, email, password, passwordConfirmation } = credentials;

    await api.post('signup', {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(['@ICods:token', '@ICods:user']);

      setData({} as AuthState);
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  const alterProfileVisibility = useCallback(
    async (id: string, token: string) => {
      try {
        const res = await api.patch('changeVisibility', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data;
        await updateUser(user);
      } catch (error) {
        log.error(error);
      }
    },
    [],
  );

  const deleteUser = useCallback(async (token: string) => {
    try {
      await api.delete('delete-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      log.error(error);
    }
  }, []);

  const updateUser = useCallback(
    async (updatedUser: User) => {
      AsyncStorage.setItem('@ICods:user', JSON.stringify(updatedUser));
      const token = data.token;
      setData({
        token,
        user: {
          ...updatedUser,
        },
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signUp,
        token: data.token,
        signOut,
        isLoading,
        updateUser,
        deleteUser,
        alterProfileVisibility,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be wrapped inside an AuthProvider');
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
