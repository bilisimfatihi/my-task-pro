import React, { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./ThemeContext";

const themes = {
  light: {
    colors: {
      mainBgColor: "#f6f6f7",
      sidebarBgColor: "#f5f5f5",
      headerBgColor: "#ffffff",
      cardBgColor: "#ffffff",
      textColor: "#161616",
      borderColor: "#e8e8e8",
      primaryColor: "#5255BC",
      accentColor: "#BEDBB0",
      // Theme colors
      themeWrapper: "#ffffff",
      themeWrapperBorder: "#e8e8e8",
      themeMainTextColor: "#161616",
      mainTextColor: "#161616",
      mainPageTextColor: "#161616",
      burgerColor: "#161616",
      secondaryTextColor: "#161616",
      secondaryTextColorLowOp: "rgba(22, 22, 22, 0.5)",
      // Modal colors
      modalBgColor: "rgba(22, 22, 22, 0.8)",
      modalWindowsBgColor: "#ffffff",
      modalBorderColorLowOp: "rgba(22, 22, 22, 0.1)",
      modalBtnHover: "#f5f5f5",
      modalPlusIconWrapper: "#ffffff",
      modalPlusIcon: "#161616",
      // Priority colors
      priorityColorLow: "#8fa1d0",
      priorityColorMedium: "#e09cb5",
      priorityColorHigh: "#bedbb0",
      priorityColorWithout: "rgba(22, 22, 22, 0.1)",
      // Accent colors
      accentTextColor: "#bedbb0",
      accentBgColor: "#bedbb0",
      // Button colors
      addColumnBtn: "#f5f5f5",
      // Calendar colors
      calendarBgColor: "#ffffff",
      calendarNumbersOutLowOp: "rgba(22, 22, 22, 0.3)",
      // Scroll colors
      cardListScrollThumb: "rgba(22, 22, 22, 0.1)",
      cardListScrollBar: "transparent",
      // Other colors
      whiteColor: "#ffffff",
      blackColor: "#161616",
      errorColor: "#e74c3c",
    },
  },
  dark: {
    colors: {
      mainBgColor: "#1F1F1F",
      sidebarBgColor: "#121212",
      headerBgColor: "#161616",
      cardBgColor: "#121212",
      textColor: "#ffffff",
      borderColor: "#333333",
      primaryColor: "#5255BC",
      accentColor: "#BEDBB0",
      // Theme colors
      themeWrapper: "#151515",
      themeWrapperBorder: "#333333",
      themeMainTextColor: "#ffffff",
      mainTextColor: "#ffffff",
      mainPageTextColor: "#ffffff",
      burgerColor: "#ffffff",
      secondaryTextColor: "#ffffff",
      secondaryTextColorLowOp: "rgba(255, 255, 255, 0.5)",
      // Modal colors
      modalBgColor: "rgba(0, 0, 0, 0.8)",
      modalWindowsBgColor: "#151515",
      modalBorderColorLowOp: "rgba(255, 255, 255, 0.1)",
      modalBtnHover: "#1f1f1f",
      modalPlusIconWrapper: "#1f1f1f",
      modalPlusIcon: "#ffffff",
      // Priority colors
      priorityColorLow: "#8fa1d0",
      priorityColorMedium: "#e09cb5",
      priorityColorHigh: "#bedbb0",
      priorityColorWithout: "rgba(255, 255, 255, 0.1)",
      // Accent colors
      accentTextColor: "#bedbb0",
      accentBgColor: "#bedbb0",
      // Button colors
      addColumnBtn: "#1f1f1f",
      // Calendar colors
      calendarBgColor: "#151515",
      calendarNumbersOutLowOp: "rgba(255, 255, 255, 0.3)",
      // Scroll colors
      cardListScrollThumb: "rgba(255, 255, 255, 0.1)",
      cardListScrollBar: "transparent",
      // Other colors
      whiteColor: "#ffffff",
      blackColor: "#161616",
      errorColor: "#e74c3c",
    },
  },
  violet: {
    colors: {
      mainBgColor: "#ECEDFD",
      sidebarBgColor: "#5255BC",
      headerBgColor: "#ECEDFD",
      cardBgColor: "#ffffff",
      textColor: "#161616",
      borderColor: "#5255BC",
      primaryColor: "#5255BC",
      accentColor: "#BEDBB0",
      // Theme colors
      themeWrapper: "#ffffff",
      themeWrapperBorder: "#5255BC",
      themeMainTextColor: "#161616",
      mainTextColor: "#161616",
      mainPageTextColor: "#161616",
      burgerColor: "#161616",
      secondaryTextColor: "#161616",
      secondaryTextColorLowOp: "rgba(22, 22, 22, 0.5)",
      // Modal colors
      modalBgColor: "rgba(22, 22, 22, 0.8)",
      modalWindowsBgColor: "#ffffff",
      modalBorderColorLowOp: "rgba(22, 22, 22, 0.1)",
      modalBtnHover: "#ECEDFD",
      modalPlusIconWrapper: "#5255BC",
      modalPlusIcon: "#ffffff",
      // Priority colors
      priorityColorLow: "#8fa1d0",
      priorityColorMedium: "#e09cb5",
      priorityColorHigh: "#bedbb0",
      priorityColorWithout: "rgba(22, 22, 22, 0.1)",
      // Accent colors
      accentTextColor: "#5255BC",
      accentBgColor: "#5255BC",
      // Button colors
      addColumnBtn: "#ECEDFD",
      // Calendar colors
      calendarBgColor: "#ffffff",
      calendarNumbersOutLowOp: "rgba(22, 22, 22, 0.3)",
      // Scroll colors
      cardListScrollThumb: "rgba(22, 22, 22, 0.1)",
      cardListScrollBar: "transparent",
      // Other colors
      whiteColor: "#ffffff",
      blackColor: "#161616",
      errorColor: "#e74c3c",
    },
  },
};

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const setTheme = (theme) => {
    const next = themes[theme] ? theme : "light";
    setCurrentTheme(next);
    localStorage.setItem("theme", next);
    document.body.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  // Keep toggleTheme for legacy usage (light <-> dark)
  const toggleTheme = () =>
    setTheme(currentTheme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme, toggleTheme }}>
      <StyledThemeProvider theme={themes[currentTheme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
