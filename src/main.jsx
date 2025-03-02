import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routers from "./routers/routers"; // Corrigir o nome da importação

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routers />
  </StrictMode>
);
