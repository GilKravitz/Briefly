import { StyleSheet } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Link } from "expo-router";
import { Text } from "@/components/Themed";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Text variant="title">Privacy Policy</Text>
      <Link href="../">
        <Text>Close</Text>
      </Link>
    </Container>
  );
};

export default PrivacyPolicy;
