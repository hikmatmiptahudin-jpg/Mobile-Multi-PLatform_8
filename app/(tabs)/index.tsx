
import { useMemo, useState } from "react";

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import DiaryCard from "../../src/components/DiaryCard";

import {
  toggleFavorite,
  resetDiaries,
  selectTotalDiaries,
  selectTotalFavorites,
} from "../../src/features/diary/diarySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/redux/hooks";

import {
  COLORS,
  SPACE,
  TYPO,
} from "../../src/styles/tokens";

const MOODS = ["Semua", "Senang", "Sedih", "Marah", "Lelah"];

export default function HomeScreen() {
  // AC.1: Mengamati render ulang Home
  console.log("Home render");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedMood, setSelectedMood] = useState("Semua");

  const entries = useAppSelector(
    (state) => state.diary.entries
  );

  // Statistik dari Redux selector
  const totalDiaries = useAppSelector(selectTotalDiaries);
  const totalFavorites = useAppSelector(selectTotalFavorites);

  // Filter diary berdasarkan mood
  const filteredEntries = useMemo(() => {
    if (selectedMood === "Semua") {
      return entries;
    }

    return entries.filter(
      (item) => item.mood === selectedMood
    );
  }, [entries, selectedMood]);

  const handleReset = () => {
    Alert.alert(
      "Reset Diary",
      "Kembalikan data diary ke kondisi awal?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => dispatch(resetDiaries()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* AD.4: Statistik */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalDiaries}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalFavorites}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      {/* Filter mood */}
      <Text style={styles.sectionTitle}>Filter Mood</Text>

      <View style={styles.filterRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setSelectedMood(item)}
            style={[
              styles.filterButton,
              selectedMood === item && styles.selectedFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedMood === item && styles.selectedFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tombol reset eksperimen AC.3 */}
      <Pressable
        style={styles.resetButton}
        onPress={handleReset}
      >
        <Text style={styles.resetButtonText}>
          Reset Data Diary
        </Text>
      </Pressable>

      <FlatList
        data={filteredEntries}
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
              router.push({
                pathname: "/detail/[id]" as any,
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {entries.length === 0
                ? "Belum ada diary"
                : "Diary tidak ditemukan"}
            </Text>

            <Text style={styles.empty}>
              {entries.length === 0
                ? "Tambahkan cerita harianmu melalui menu Tambah."
                : `Belum ada diary dengan mood ${selectedMood}. Coba pilih mood lain.`}
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
    marginBottom: SPACE.m,
  },
  statsContainer: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statBox: {
    flex: 1,
    padding: SPACE.m,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    color: COLORS.muted,
  },
  sectionTitle: {
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
    marginBottom: SPACE.m,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  selectedFilter: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 12,
  },
  selectedFilterText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  resetButton: {
    backgroundColor: COLORS.danger,
    padding: SPACE.m,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  resetButtonText: {
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
    color: COLORS.muted,
    textAlign: "center",
  },
});
