import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@excalidraw/excalidraw/index.css";
import "./index.css";
import App from "./App.tsx";
import { configureDisplayFont } from "./utils/displayFont";
import { LocaleProvider } from "./context/LocaleProvider";

configureDisplayFont();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
