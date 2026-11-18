
import { useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { useAppDispatch } from "../../src/redux/hooks";

import { addDiary } from "../../src/features/diary/diarySlice";

import {
  COLORS,
  RADIUS,
  SPACE,
} from "../../src/styles/tokens";

const MOODS = ["Senang", "Sedih", "Marah", "Lelah"];

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(MOODS[0]);

  const saveDiary = () => {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    // Validasi judul minimal 3 karakter
    if (cleanTitle.length < 3) {
      Alert.alert(
        "Validasi Judul",
        "Judul diary minimal harus 3 karakter."
      );
      return;
    }

    if (!cleanBody) {
      Alert.alert(
        "Validasi",
        "Isi diary wajib diisi."
      );
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    dispatch(
      addDiary({
        title: cleanTitle,
        date: today,
        preview: cleanBody.slice(0, 100),
        body: cleanBody,
        mood,
      })
    );

    setTitle("");
    setBody("");
    setMood(MOODS[0]);

    Alert.alert("Berhasil", "Diary berhasil disimpan.");

    router.replace("/(tabs)" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tambah Diary</Text>

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
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>
        Bagaimana perasaanmu hari ini?
      </Text>

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

      <Pressable onPress={saveDiary} style={styles.button}>
        <Text style={styles.buttonText}>Simpan Diary</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    minHeight: 140,
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
