import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { SERVER_ENDPOINT } from "./constants";

interface AuthContextState {
  authenticated: boolean;
  userId: number;
  username: string;
  email: string;
  location: string;
  setUserId: (userId: number) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  deleteAccountAsync: () => Promise<void>;
  logout: () => void;
  login: (password: string) => Promise<boolean>;
  setLocation: (location: string) => void;
  reloadDataAsync: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  authenticated: false,
  userId: -Infinity,
  username: "",
  email: "",
  location: "",
  setUserId: (userId) => {},
  setAuthenticated: (authenticated) => {},
  setUsername: (username) => {},
  setEmail: (email) => {},
  deleteAccountAsync: async () => {},
  logout: () => {},
  login: async (password) => false,
  setLocation: () => {},
  reloadDataAsync: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("thap");
  const [email, setEmail] = useState("thap@gmail.com");
  const [userId, setUserId] = useState(1);
  const [location, setLocation] = useState("Lang Son, Vietnam");

  async function deleteAccountAsync() {
    if (!authenticated) return;
    try {
      const url = `${SERVER_ENDPOINT}/api/profile/${userId}`;
      await axios.delete(url);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  async function login(password: string) {
    Keyboard.dismiss();
    try {
      const url = `${SERVER_ENDPOINT}/api/login`;
      const response = await axios.post(url, { email, password });
      const { user } = response.data;
      setUserId(user.id);
      setUsername(user.username);
      setEmail(user.email);
      setLocation(user.location);
      console.log("USER ID", user.id);
      setAuthenticated(true);
      return true;
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      setUserId(-Infinity);
      setAuthenticated(false);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setEmail("");
    setUserId(-Infinity);
  }

  async function reloadDataAsync() {
    const url = `${SERVER_ENDPOINT}/api/profile/${userId}`;
    try {
      const response = await axios.get(url);
      const { username, email, location } = response.data.user;
      setUsername(username);
      setEmail(email);
      setLocation(location);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
        authenticated,
        email,
        setAuthenticated,
        setEmail,
        deleteAccountAsync,
        logout,
        location,
        setLocation,
        login,
        reloadDataAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
