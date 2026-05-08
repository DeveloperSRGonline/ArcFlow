import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      {/* Protected Application Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home or sign-in */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
