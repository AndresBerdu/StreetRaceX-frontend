import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  username: string;
  email: string;
  rank: string;
}

interface AuthContextProps {
  user: User | null;

  login: (email: string) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const fakeUser: User = {
      username: "Takumi",
      email,
      rank: "C",
    };

    setUser(fakeUser);

    localStorage.setItem(
      "streetracex-user",
      JSON.stringify(fakeUser)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "streetracex-user"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};