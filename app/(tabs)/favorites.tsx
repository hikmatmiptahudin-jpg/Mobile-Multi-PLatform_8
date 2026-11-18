
import { useMemo } from "react";

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/redux/hooks";

import {
  toggleFavorite,
  clearAllFavorites,
  selectTotalFavorites,
} from "../../src/features/diary/diarySlice";

import DiaryCard from "../../src/components/DiaryCard";

import {
  COLORS,
  SPACE,
  TYPO,
} from "../../src/styles/tokens";

export default function FavoritesScreen() {
  // AC.1: Mengamati render ulang Favorites
  console.log("Favorites render");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector(
    (state) => state.diary.entries
  );

  const totalFavorites = useAppSelector(selectTotalFavorites);

  const favoriteEntries = useMemo(
    () => entries.filter((entry) => entry.liked),
    [entries]
  );

  // AD.5: Menghapus semua favorite
  const handleClearFavorites = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Apakah kamu yakin ingin menghapus semua tanda favorite?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>

      <Text style={styles.counter}>
        Total {totalFavorites} diary favorite
      </Text>

      {favoriteEntries.length > 0 && (
        <Pressable
          style={styles.clearButton}
          onPress={handleClearFavorites}
        >
          <Text style={styles.clearButtonText}>
            Hapus Semua Favorite
          </Text>
        </Pressable>
      )}

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() =>
              dispatch(toggleFavorite({ id: item.id }))
            }
            onPress={() =>
              router.push(`/detail/${item.id}` as any)
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Belum ada diary favorit
            </Text>

            <Text style={styles.empty}>
              Tandai diary dengan tombol favorite di halaman Home
              untuk menampilkannya di sini.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
  clearButton: {
    backgroundColor: COLORS.danger,
    padding: SPACE.m,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    padding: SPACE.l,
  },
  emptyTitle: {
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
  },
});
