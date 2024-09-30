import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Root } from "./Root.tsx";
import { HomePage } from "./Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
