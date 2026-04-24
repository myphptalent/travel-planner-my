import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  modal: {
    isOpen: boolean;
    type: "schedule" | "view" | null;
  };
  toast: {
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  };
  theme: "light" | "dark";
  sidebarOpen: boolean;
}

const initialState: UIState = {
  modal: {
    isOpen: false,
    type: null,
  },
  toast: {
    message: "",
    type: "info",
    isVisible: false,
  },
  theme: "light",
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Modal actions
    openModal: (state, action: PayloadAction<UIState["modal"]["type"]>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload;
    },

    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
    },

    // Toast actions
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type?: "success" | "error" | "info";
      }>
    ) => {
      state.toast.message = action.payload.message;
      state.toast.type = action.payload.type || "info";
      state.toast.isVisible = true;
    },

    hideToast: (state) => {
      state.toast.isVisible = false;
      state.toast.message = "";
    },

    // Theme actions
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },

    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  showToast,
  hideToast,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
