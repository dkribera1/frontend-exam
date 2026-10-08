import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import App from "./App.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b5cff",
    },
    secondary: {
      main: "#ff7a00",
    },
    background: {
      default: "#f5f7fb",
    },
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 800,
    },

    h3: {
      fontWeight: 800,
    },

    h4: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 750,
    },
  },

  shape: {
    borderRadius: 14,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BookingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookingProvider>

    </ThemeProvider>
  </React.StrictMode>
);