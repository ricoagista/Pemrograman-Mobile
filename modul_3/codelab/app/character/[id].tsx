import {
  useEffect,
  useState,
} from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import StatCard from "../../components/StatCard";

import {
  getCharacterDetail,
} from "../../services/characterService";

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "../../services/favoriteService";

import {
  CharacterDetail,
} from "../../types/character";

import { colors } from "../../constants/theme";

export default function CharacterDetailScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const [data, setData] =
    useState<CharacterDetail | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [favorite, setFavorite] =
    useState(false);

  async function loadCharacter() {
    try {
      setLoading(true);
      setError(null);

      const characterId =
        Number(id);

      const result =
        await getCharacterDetail(
          characterId
        );

      setData(result);

      const favoriteStatus =
        await isFavorite(
          characterId
        );

      setFavorite(
        favoriteStatus
      );
    } catch (error) {
      console.log(error);

      setError(
        "Gagal mengambil detail character."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacter();
  }, [id]);

  async function toggleFavorite() {
    if (!data) {
      return;
    }

    try {
      if (favorite) {
        await removeFavorite(
          data.character.id
        );

        setFavorite(false);
      } else {
        await addFavorite(
          data.character
        );

        setFavorite(true);
      }
    } catch (error) {
      console.log(
        "Favorite error:",
        error
      );
    }
  }

  if (loading) {
    return (
      <Loading message="Loading character detail..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >
      <View style={styles.hero}>
        <Text style={styles.avatar}>
          {data.character.image}
        </Text>

        <Text style={styles.name}>
          {data.character.name}
        </Text>

        <Text style={styles.anime}>
          {data.character.anime}
        </Text>

        <Pressable
          style={[
            styles.favoriteButton,
            favorite && styles.favoriteButtonRemove,
          ]}
          onPress={toggleFavorite}
        >
          <Text
            style={styles.favoriteButtonText}
          >
            {favorite
              ? "❤️ Remove Favorite"
              : "🤍 Add Favorite"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          About
        </Text>

        <Text style={styles.description}>
          {data.character.description}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Information
        </Text>

        <Text style={styles.info}>
          Age: {data.character.age}
        </Text>

        <Text style={styles.info}>
          Gender: {data.character.gender}
        </Text>

        <Text style={styles.info}>
          Anime: {data.character.anime}
        </Text>
      </View>

      {data.statistics && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Statistics
          </Text>

          <View style={styles.stats}>
            <StatCard
              title="Popularity"
              value={`${data.statistics.popularity}%`}
            />

            <StatCard
              title="Rank"
              value={`#${data.statistics.rank}`}
            />

            <StatCard
              title="Favorites"
              value={data.statistics.favorites}
            />
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Anime
        </Text>

        {data.anime.map((anime) => (
          <View
            key={anime.id}
            style={styles.animeCard}
          >
            <Text style={styles.animeTitle}>
              {anime.title}
            </Text>

            <Text>
              Episodes: {anime.episodes}
            </Text>

            <Text>
              Score: ⭐ {anime.score}
            </Text>

            <Text>
              Year: {anime.year}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
  },

  hero: {
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatar: {
    fontSize: 80,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
    color: colors.textPrimary,
  },

  anime: {
    color: colors.primary,
    fontWeight: "700",
    marginTop: 5,
  },

  favoriteButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },

  favoriteButtonRemove: {
    backgroundColor: colors.alert,
  },

  favoriteButtonText: {
    color: colors.textPrimary,
    fontWeight: "700",
  },

  section: {
    backgroundColor: colors.surface,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    color: colors.textPrimary,
  },

  description: {
    lineHeight: 22,
    color: colors.textSecondary,
  },

  info: {
    marginBottom: 7,
    color: colors.textSecondary,
  },

  stats: {
    flexDirection: "row",
    marginHorizontal: -5,
  },

  animeCard: {
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },

  animeTitle: {
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 6,
    color: colors.textPrimary,
  },
});