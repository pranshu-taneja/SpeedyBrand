import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AiEditor from "./Pages/AiEditor.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/AiEditor" element={<AiEditor />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
