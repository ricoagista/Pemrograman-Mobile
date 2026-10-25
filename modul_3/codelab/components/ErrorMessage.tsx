import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../constants/theme";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>

      <Text style={styles.title}>
        Something went wrong
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#3A1C1C",
    borderLeftWidth: 4,
    borderLeftColor: colors.alert,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: colors.alert,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    color: colors.alert,
  },

  message: {
    color: colors.textSecondary,
    textAlign: "center",
  },
});