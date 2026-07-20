import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-[12px] bg-[#2563EB] flex items-center justify-center text-white font-bold text-lg animate-pulse">R</div>
          <p className="text-[#6B7280] text-[15px]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
