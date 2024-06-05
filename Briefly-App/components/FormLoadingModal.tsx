import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import LottieView from "lottie-react-native";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

type FormLoadingModalProps = {
  status: "error" | "idle" | "pending" | "success";
  onModalClose?: () => void;
};

const FormLoadingModal: React.FC<FormLoadingModalProps> = ({ status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerOpacity = useSharedValue(0);
  const pendingOpacity = useSharedValue(0);
  const errorOpacity = useSharedValue(0);
  const successOpacity = useSharedValue(0);
  const containerStyle = useAnimatedStyle(() => ({ opacity: containerOpacity.value }));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "idle") {
      containerOpacity.value = withTiming(0, { duration: 150, easing: Easing.linear });
      setIsModalOpen(false);
      return;
    } else {
      setIsModalOpen(true);
      containerOpacity.value = withTiming(1, { duration: 150, easing: Easing.linear });
    }

    switch (status) {
      case "pending":
        pendingOpacity.value = withTiming(1, { duration: 150, easing: Easing.linear });
        break;
      case "success":
        timer = setTimeout(() => {
          successOpacity.value = withTiming(1, { duration: 150, easing: Easing.linear });
          pendingOpacity.value = withTiming(0, { duration: 150, easing: Easing.linear });
          setIsModalOpen(false);
        }, 1500);
        break;
      case "error":
        timer = setTimeout(() => {
          errorOpacity.value = withTiming(1, { duration: 150, easing: Easing.linear });
          pendingOpacity.value = withTiming(0, { duration: 150, easing: Easing.linear });
          setIsModalOpen(false);
        }, 1500);
        break;
      default:
        break;
    }
    return () => clearTimeout(timer);
  }, [status]);
  if (!isModalOpen) return;
  return (
    <Animated.View style={[styles.overlay, containerStyle]}>
      <Container style={styles.container}>
        {status === "pending" && (
          <Animated.View style={[styles.animationContainer]}>
            <LottieView style={styles.lottie} source={require("@/assets/lottie/sending.json")} autoPlay loop />
          </Animated.View>
        )}
        {status === "success" && (
          <Animated.View style={[styles.animationContainer]}>
            <LottieView style={styles.lottie} source={require("@/assets/lottie/success.json")} autoPlay loop />
          </Animated.View>
        )}
        {status === "error" && (
          <Animated.View style={[styles.animationContainer]}>
            <LottieView
              speed={1.5}
              style={styles.lottie}
              source={require("@/assets/lottie/error.json")}
              autoPlay
              loop
            />
          </Animated.View>
        )}
      </Container>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 20,
  },
  animationContainer: {
    position: "absolute",
    width: 200,
    height: 200,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});

export default FormLoadingModal;
