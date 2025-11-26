import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;