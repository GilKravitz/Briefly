import { StyleSheet } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Text } from "@/components/Themed";
import { Redirect } from "expo-router";

const Settings = () => {
  return <Redirect href="(app)/SelectCategories" />;
  return (
    <Container>
      <Text variant="title">Settings</Text>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({});
