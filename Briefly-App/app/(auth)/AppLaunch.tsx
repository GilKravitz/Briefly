import { ImageBackground, StyleSheet } from "react-native";
import Container from "@/components/Container";
import { View, Text } from "@/components/Themed";
import React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import Button from "@/components/pressable/Button";
import { Link } from "expo-router";
import { t } from "@/core/i18n";
import { useAppLaunchActions } from "@/core/hooks/screenHooks/AppLaunch";

const Icon = (props: SvgProps) => {
  return (
    <Svg width={151} height={178} fill="none" {...props}>
      <Path
        fill="white"
        d="M0 0v151.426h76.359c53.645 0 77.008-55.595 42.399-81.122C143.849 42.614 120.049 0 78.736 0H0ZM124.232 155.855a4.43 4.43 0 0 1 4.429-4.429h17.716a4.43 4.43 0 0 1 4.429 4.429v17.716a4.43 4.43 0 0 1-4.429 4.429h-17.716a4.43 4.43 0 0 1-4.429-4.429v-17.716Z"
      />
    </Svg>
  );
};

const AppLaunch = () => {
  const { handleSignUpPress } = useAppLaunchActions();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground resizeMode="stretch" style={styles.header} source={require("@/assets/images/wave.png")}>
        <Icon />
      </ImageBackground>
      <Container style={{ minHeight: "auto" }}>
        <View style={styles.main}>
          <Text variant="title">{t.index.heading}</Text>
          <Text style={styles.text} colorName="textMuted">
            {t.index.subheading}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button onPress={handleSignUpPress}>{t.index.signupBtn}</Button>
          <View row style={styles.signInWrapper}>
            <Text colorName="textMuted">{t.index.signInMsg}</Text>
            <Link push href="/(auth)/SignIn">
              <Text variant="text">{t.index.signInLink}</Text>
            </Link>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default AppLaunch;

const styles = StyleSheet.create({
  header: {
    flex: 1.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 16,
  },
  footer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  signInWrapper: {
    gap: 5,
    alignItems: "baseline",
  },
});
