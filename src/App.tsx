"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { TemplateSelection } from "./pages/TemplateSelection";
import { FormPage } from "./pages/FormPage";
import { PreviewPage } from "./pages/PreviewPage";
import { AuthPage } from "./pages/AuthPage";
import { AppShell } from "./components/Layout/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes — all wrapped in AppShell */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Dashboard />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <AppShell>
                  <TemplateSelection />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <AppShell>
                  <FormPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <AppShell>
                  <PreviewPage />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
