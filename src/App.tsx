import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "./contexts/AppContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TiersListPage from "./pages/TiersListPage";
import TierDetailPage from "./pages/TierDetailPage";
import TierFormPage from "./pages/TierFormPage";
import ContactsPage from "./pages/ContactsPage";
import AssistantPage from "./pages/AssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useApp();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
      <Route path="/tiers" element={<ProtectedRoute><AppLayout><TiersListPage /></AppLayout></ProtectedRoute>} />
      <Route path="/tiers/nouveau" element={<ProtectedRoute><AppLayout><TierFormPage /></AppLayout></ProtectedRoute>} />
      <Route path="/tiers/:id" element={<ProtectedRoute><AppLayout><TierDetailPage /></AppLayout></ProtectedRoute>} />
      <Route path="/tiers/:id/modifier" element={<ProtectedRoute><AppLayout><TierFormPage /></AppLayout></ProtectedRoute>} />
      <Route path="/contacts" element={<ProtectedRoute><AppLayout><ContactsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><AppLayout><AssistantPage /></AppLayout></ProtectedRoute>} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
