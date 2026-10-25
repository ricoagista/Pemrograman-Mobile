import {
  Stack,
} from "expo-router";

import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Anime Hunter",
        }}
      />

      <Stack.Screen
        name="search"
        options={{
          title: "Search Character",
        }}
      />

      <Stack.Screen
        name="favorites"
        options={{
          title: "Favorites",
        }}
      />

      <Stack.Screen
        name="character/[id]"
        options={{
          title: "Character Detail",
        }}
      />
    </Stack>
  );
}