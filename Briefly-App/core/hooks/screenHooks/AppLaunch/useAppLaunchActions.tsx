import { useCallback } from "react";
import { router } from "expo-router";

const useAppLaunchActions = () => {
  const handleSignUpPress = useCallback(() => {
    router.push("/(auth)/SignUp");
  }, []);

  return {
    handleSignUpPress,
  };
};

export default useAppLaunchActions;
