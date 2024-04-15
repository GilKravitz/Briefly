import { StyleSheet } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Heading, Text } from "@/components/StyledText";
import { Link } from "expo-router";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Heading>Privacy Policy</Heading>
      <Link href="../">
        <Text>Close</Text>
      </Link>
    </Container>
  );
};

export default PrivacyPolicy;
