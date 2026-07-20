"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { TemplateSelection } from "./pages/TemplateSelection";
import { FormPage } from "./pages/FormPage";
import { PreviewPage } from "./pages/PreviewPage";
import { AppShell } from "./components/Layout/AppShell";

export default function App() {
  return (
    <Router basename="/resumebuild-ts/">
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

