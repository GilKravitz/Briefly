import { Dimensions, I18nManager, StyleSheet } from "react-native";
import Container from "@/components/Container";
import { Heading3, Text } from "@/components/StyledText";
import { View } from "@/components/Themed";
import React, { useEffect } from "react";

import Svg, { SvgProps, Path } from "react-native-svg";
import Button from "@/components/pressable/Button";
import { Link, Redirect, router } from "expo-router";
import * as Updates from "expo-updates";
import i18n, { t } from "@/i18n";

const Header = (props: SvgProps) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <Svg width={width} height={525} fill="none" {...props}>
      <Path
        fill="#2D2D2D"
        d="M0-1v398.763s33.4 71.741 119.273 63.416c85.872-8.325 103.682-53.163 207.364 29.473 0 0 36.576 34.585 103.363 33.314V-1H0Z"
      />
      <Path
        fill="#F8F8F8"
        d="M154 167v159.894h79.65c55.958 0 80.329-58.704 44.228-85.658C304.051 211.996 279.225 167 236.13 167H154ZM284.05 331.571c0-2.583 2.068-4.677 4.62-4.677h18.479c2.552 0 4.62 2.094 4.62 4.677v18.706c0 2.583-2.068 4.677-4.62 4.677H288.67c-2.552 0-4.62-2.094-4.62-4.677v-18.706Z"
      />
    </Svg>
  );
};

const index = () => {
  // i18n.locale = "he";
  return <Redirect href={"/(tabs)"} />;
  return (
    <Container paddingTop={0}>
      <Header style={styles.header} />
      <View style={styles.main}>
        <Heading3>{t.index.heading}</Heading3>
        <Text style={styles.text} colorName="textMuted">
          {t.index.subheading}
        </Text>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => router.push("/(auth)/SignUp")}>{t.index.signupBtn}</Button>
        <View row style={{ gap: 5, alignItems: "baseline" }}>
          <Text colorName="textMuted">{t.index.signInMsg}</Text>
          <Link push href="/(auth)/SignIn">
            <Heading3 size={16}>{t.index.signInLink}</Heading3>
          </Link>
        </View>
      </View>
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    flex: 1,
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
});
