
import { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/redux/hooks";

import { editDiary } from "../../src/features/diary/diarySlice";

import {
  COLORS,
  RADIUS,
  SPACE,
} from "../../src/styles/tokens";

const MOODS = ["Senang", "Sedih", "Marah", "Lelah"];

export default function EditDiaryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find(
      (item) => item.id === Number(id)
    )
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(MOODS[0]);

  // Mengisi form dengan data diary yang dipilih
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
      setMood(entry.mood);
    }
  }, [entry?.id]);

  const saveChanges = () => {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (cleanTitle.length < 3) {
      Alert.alert(
        "Validasi Judul",
        "Judul diary minimal harus 3 karakter."
      );
      return;
    }

    if (!cleanBody) {
      Alert.alert("Validasi", "Isi diary wajib diisi.");
      return;
    }

    if (!entry) return;

    dispatch(
      editDiary({
        id: entry.id,
        title: cleanTitle,
        body: cleanBody,
        mood,
      })
    );

    Alert.alert("Berhasil", "Diary berhasil diperbarui.");
    router.replace(`/detail/${entry.id}` as any);
  };

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Diary tidak ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Diary</Text>

      <Text style={styles.label}>Judul Diary</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Minimal 3 karakter"
        style={styles.input}
      />

      <Text style={styles.label}>Isi Diary</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ubah isi diary..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>Pilih Mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[
              styles.moodButton,
              mood === item && styles.selectedMood,
            ]}
          >
            <Text style={styles.moodText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={saveChanges}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Simpan Perubahan
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  label: {
    color: COLORS.text,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
  },
  bodyInput: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  moodText: {
    color: COLORS.text,
  },
  button: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
