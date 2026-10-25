import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { colors } from "../constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        🎌
      </Text>

      <Text style={styles.title}>
        Anime Hunter
      </Text>

      <Text style={styles.subtitle}>
        Learn Async Programming with React Native
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push("/search")
        }
      >
        <Text style={styles.buttonText}>🔎 Search Character</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={() =>
          router.push("/favorites")
        }
      >
        <Text style={styles.buttonText}>❤️ My Favorites</Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Async concepts</Text>

        <Text style={styles.infoText}>• Promise</Text>

        <Text style={styles.infoText}>• async / await</Text>

        <Text style={styles.infoText}>• .then() / .catch()</Text>

        <Text style={styles.infoText}>• try / catch / finally</Text>

        <Text style={styles.infoText}>• Promise.all()</Text>

        <Text style={styles.infoText}>• Promise.allSettled()</Text>

        <Text style={styles.infoText}>• AsyncStorage</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  emoji: {
    textAlign: "center",
    fontSize: 60,
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    color: colors.textPrimary,
  },

  subtitle: {
    textAlign: "center",
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 30,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 16,
    marginBottom: 12,
  },

  secondary: {
    backgroundColor: colors.secondary,
  },

  buttonText: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  info: {
    marginTop: 25,
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  infoTitle: {
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 10,
    color: colors.textPrimary,
  },

  infoText: {
    color: colors.textSecondary,
    marginBottom: 5,
  },
});