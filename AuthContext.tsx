import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { SERVER_ENDPOINT } from "./constants";

interface AuthContextState {
  authenticated: boolean;
  avatarBase64: string | null;
  changeAvatarAsync: (base64: string | null) => Promise<void>;
  changeCoverAsync: (base64: string | null) => Promise<void>;
  coverBase64: string | null;
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
  avatarBase64: null,
  changeAvatarAsync: async () => {},
  changeCoverAsync: async () => {},
  coverBase64: null,
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
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [coverBase64, setCoverBase64] = useState<string | null>(null);

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
      setAvatarBase64(user.avatar_base64);
      setCoverBase64(user.cover_base64);
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

  async function changeAvatarAsync(base64: string | null) {
    if (!authenticated) return setAvatarBase64(null);
    try {
      const url = `${SERVER_ENDPOINT}/api/profile/${userId}/avatar`;
      const { data } = await axios.put(url, { base64 });
      return setAvatarBase64(data.base64 ?? null);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      return setAvatarBase64(null);
    }
  }

  async function changeCoverAsync(base64: string | null) {
    if (!authenticated) return setCoverBase64(null);
    try {
      const url = `${SERVER_ENDPOINT}/api/profile/${userId}/cover`;
      const { data } = await axios.put(url, { base64 });
      return setCoverBase64(data.base64 ?? null);
    } catch (error) {
      Alert.alert(`failed, reason: ${error}`);
      return setCoverBase64(null);
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
        authenticated,
        avatarBase64,
        changeAvatarAsync,
        changeCoverAsync,
        coverBase64,
        deleteAccountAsync,
        email,
        location,
        login,
        logout,
        reloadDataAsync,
        setAuthenticated,
        setEmail,
        setLocation,
        setUserId,
        setUsername,
        userId,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
