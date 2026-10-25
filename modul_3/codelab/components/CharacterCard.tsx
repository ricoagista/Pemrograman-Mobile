import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Character } from "../types/character";

import { colors } from "../constants/theme";

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
  onFavorite?: () => void;
  favorite?: boolean;
}

export default function CharacterCard({
  character,
  onPress,
  onFavorite,
  favorite = false,
}: CharacterCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {character.image}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {character.name}
        </Text>

        <Text style={styles.anime}>
          {character.anime}
        </Text>

        <Text style={styles.description}>
          {character.description}
        </Text>
      </View>

      {onFavorite && (
        <Pressable
          style={styles.favorite}
          onPress={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
        >
          <Text style={[styles.favoriteText, favorite && styles.favoriteFilled]}>
            {favorite ? "❤️" : "🤍"}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 30,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  anime: {
    marginTop: 2,
    color: colors.primary,
    fontWeight: "600",
  },

  description: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 12,
  },

  favorite: {
    padding: 5,
  },

  favoriteText: {
    fontSize: 22,
    color: colors.textSecondary,
  },

  favoriteFilled: {
    color: colors.alert,
  },
});