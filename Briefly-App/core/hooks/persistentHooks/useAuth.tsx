import Persistent from "@/core/persistent";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      setLoading(true);
      const token = await Persistent.UserAuth.getToken();
      setToken(token);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeToken = async () => {
    try {
      setLoading(true);
      await Persistent.UserAuth.removeToken();
      setToken(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToken = async (token: string) => {
    try {
      setLoading(true);
      await Persistent.UserAuth.saveToken(token);
      setToken(token);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    loading,
    error,
    getToken,
    removeToken,
    saveToken,
  };
};

export default useAuth;
