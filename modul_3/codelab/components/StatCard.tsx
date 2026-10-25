import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../constants/theme";

interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    margin: 5,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },

  value: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primary,
  },

  title: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 12,
  },
});