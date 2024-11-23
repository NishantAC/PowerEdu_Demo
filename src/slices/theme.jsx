import { createSlice } from "@reduxjs/toolkit";
import themes from "@/Utils/themes";
import { createSelector } from "@reduxjs/toolkit";


// Read the theme from localStorage or set the default theme to "SoberViolet"
const savedTheme = localStorage.getItem("theme") || "SoberViolet";

// Apply the initial theme to the body
if (themes[savedTheme]) {
  document.body.style.background = themes[savedTheme].background;
  document.body.style.color = themes[savedTheme].textColor;
}

const initialState = {
  theme: savedTheme,
  themes,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      //* Update the selected theme
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);

      //* Update the body background color based on the selected theme
      const themeProperties = state.themes[state.theme];
      document.body.style.background = themeProperties.background;
      document.body.style.color = themeProperties.textColor;
    },
  },
});

export const selectTheme = (state) => state.theme.theme;
export const selectThemeProperties = createSelector(
  [selectTheme, (state) => state.theme.themes],
  (currentTheme, themes) => themes[currentTheme]
);


export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
