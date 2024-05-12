import { createContext, useContext, useEffect, useState } from "react";
import Persistent from "@/core/persistent";

// create a new context for the session
const SessionContext = createContext({
  token: "",
  loading: true,
  error: "",
  setToken: (token: string) => {},
  clearToken: () => {},
  refresh: () => {},
});

// create a provider for the session context
export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch the token from local storage when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await Persistent.UserAuth.getToken();
        if (token) {
          setToken(token);
        }
      } catch (e) {
        setError("An error occurred while fetching the token");
      } finally {
        // setTimeout(() => setLoading(false), 5000);
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // set the token in the context and save it to local storage
  const setTokenHandler = async (token: string) => {
    setToken(token);
    await Persistent.UserAuth.saveToken(token);
  };

  // clear the token from the context and remove it from local storage
  const clearTokenHandler = async () => {
    setToken("");
    await Persistent.UserAuth.removeToken();
  };

  // refresh the token
  const refreshHandler = async () => {
    try {
      const token = await Persistent.UserAuth.getToken();
      if (token) {
        setToken(token);
      }
    } catch (e) {
      setError("An error occurred while refreshing the token");
    }
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        loading,
        error,
        setToken: setTokenHandler,
        clearToken: clearTokenHandler,
        refresh: refreshHandler,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
