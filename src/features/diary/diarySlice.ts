
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type DiaryEntry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  mood: string;
  liked: boolean;
};

type DiaryState = {
  entries: DiaryEntry[];
  filter: "all" | "favorite";
};

const initialState: DiaryState = {
  entries: [
    {
      id: 1,
      title: "Pagi yang Tenang",
      date: "2026-11-15",
      preview: "Jalan pagi sebelum memulai aktivitas.",
      body: "Pagi ini terasa tenang. Saya berjalan selama 20 menit sebelum memulai aktivitas.",
      mood: "Senang",
      liked: false,
    },
    {
      id: 2,
      title: "Produktif di Kampus",
      date: "2026-11-14",
      preview: "Menyelesaikan modul dan berdiskusi dengan tim.",
      body: "Hari ini cukup produktif karena beberapa target perkuliahan selesai.",
      mood: "Senang",
      liked: true,
    },
    {
      id: 3,
      title: "Senja dan Buku",
      date: "2026-11-13",
      preview: "Membaca buku sambil menikmati sore.",
      body: "Sore ini saya menikmati waktu membaca buku dengan suasana santai.",
      mood: "Lelah",
      liked: false,
    },
  ],
  filter: "all",
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addDiary: (
      state,
      action: PayloadAction<Omit<DiaryEntry, "id" | "liked">>
    ) => {
      state.entries.unshift({
        id: Date.now(),
        ...action.payload,
        liked: false,
      });
    },

    // AC.2: Payload berupa object
    toggleFavorite: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const entry = state.entries.find(
        (item) => item.id === action.payload.id
      );

      if (entry) {
        entry.liked = !entry.liked;
      }
    },

    deleteDiary: (
      state,
      action: PayloadAction<number>
    ) => {
      state.entries = state.entries.filter(
        (item) => item.id !== action.payload
      );
    },

    setFilter: (
      state,
      action: PayloadAction<"all" | "favorite">
    ) => {
      state.filter = action.payload;
    },

    // AC.3: Reset seluruh state diary
    resetDiaries: () => initialState,

    // AD.1: Mengedit title, body, dan mood
    editDiary: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        body: string;
        mood: string;
      }>
    ) => {
      const entry = state.entries.find(
        (item) => item.id === action.payload.id
      );

      if (entry) {
        entry.title = action.payload.title;
        entry.body = action.payload.body;
        entry.preview = action.payload.body.slice(0, 100);
        entry.mood = action.payload.mood;
      }
    },

    // AD.5: Menghapus semua status favorite
    clearAllFavorites: (state) => {
      state.entries.forEach((entry) => {
        entry.liked = false;
      });
    },
  },
});

export const {
  addDiary,
  toggleFavorite,
  deleteDiary,
  setFilter,
  resetDiaries,
  editDiary,
  clearAllFavorites,
} = diarySlice.actions;

// AC.4 dan AD.4: Selector statistik
type DiaryRootState = {
  diary: DiaryState;
};

export const selectTotalDiaries = (state: DiaryRootState) =>
  state.diary.entries.length;

export const selectTotalFavorites = (state: DiaryRootState) =>
  state.diary.entries.filter((item) => item.liked).length;

export default diarySlice.reducer;
