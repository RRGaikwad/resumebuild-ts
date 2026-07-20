import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from "react-icons/fi";

type AuthMode = "signin" | "signup";

export function AuthPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        await signUpWithEmail(name.trim(), email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#F8FAFC] overflow-hidden">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col w-[480px] bg-[#0F172A] relative shrink-0 overflow-hidden p-12">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Blue glow */}
        <div className="absolute top-[-120px] left-[-60px] w-[400px] h-[400px] bg-[#2563EB] opacity-10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-[300px] h-[300px] bg-[#2563EB] opacity-8 rounded-full blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-3 mb-auto">
          <div className="w-10 h-10 rounded-[12px] bg-[#2563EB] flex items-center justify-center text-white font-bold text-lg shadow-lg">R</div>
          <span className="text-xl font-bold text-white tracking-tight">ResumeBuilder</span>
        </div>

        {/* Middle content */}
        <div className="relative py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[13px] font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
            Trusted by 10,000+ professionals
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Build a resume that<br />
            <span className="text-[#2563EB]">gets you hired.</span>
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-relaxed">
            ATS-optimized templates, real-time AI suggestions, and one-click exports. Your next job is one resume away.
          </p>

          {/* Feature list */}
          <div className="mt-10 flex flex-col gap-4">
            {[
              { icon: "✦", text: "ATS-Optimized Professional Templates" },
              { icon: "✦", text: "AI-Powered Content Suggestions" },
              { icon: "✦", text: "One-Click PDF & DOCX Export" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-[#2563EB] text-lg font-bold">{item.icon}</span>
                <span className="text-[#D1D5DB] text-[14px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative bg-white/5 border border-white/10 rounded-[16px] p-5">
          <p className="text-[#D1D5DB] text-[14px] leading-relaxed italic mb-4">
            "I landed 3 interviews in my first week of using this. The ATS score feature alone is worth it."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-[13px] font-bold">A</div>
            <div>
              <p className="text-white text-[13px] font-semibold">Aakash M.</p>
              <p className="text-[#6B7280] text-[12px]">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-[10px] bg-[#2563EB] flex items-center justify-center text-white font-bold">R</div>
          <span className="text-[18px] font-bold text-[#111827] tracking-tight">ResumeBuilder</span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-[#111827] mb-1.5">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[#6B7280] text-[15px]">
              {mode === "signin"
                ? "Sign in to continue building your resume."
                : "Start for free. No credit card required."}
            </p>
          </div>

          {/* Mode tabs */}
          <div className="flex bg-[#F1F5F9] rounded-[12px] p-1 mb-8">
            {(["signin", "signup"] as AuthMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 h-[38px] rounded-[10px] text-[14px] font-semibold transition-all duration-200 ${
                  mode === m
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full h-[48px] bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] text-[15px] font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-md mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-[#E5E7EB] border-t-[#2563EB] rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[13px] text-[#9CA3AF] font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] p-3.5 mb-5">
              <FiAlertCircle className="text-[#EF4444] text-lg mt-0.5 shrink-0" />
              <p className="text-[#DC2626] text-[14px] leading-snug">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError(); }}
                  className="w-full h-[52px] bg-white border border-[#E5E7EB] rounded-[12px] pl-12 pr-4 text-[15px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                className="w-full h-[52px] bg-white border border-[#E5E7EB] rounded-[12px] pl-12 pr-4 text-[15px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={mode === "signup" ? "Create a password" : "Password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                className="w-full h-[52px] bg-white border border-[#E5E7EB] rounded-[12px] pl-12 pr-12 text-[15px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>

            {mode === "signin" && (
              <div className="flex justify-end -mt-1">
                <button type="button" className="text-[13px] text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2.5 mt-1 hover:scale-[1.01] shadow-[0_4px_16px_rgba(37,99,235,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>

          <p className="text-[13px] text-[#9CA3AF] text-center mt-6">
            By continuing, you agree to our{" "}
            <span className="text-[#2563EB] hover:underline cursor-pointer">Terms</span>{" "}
            and{" "}
            <span className="text-[#2563EB] hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function getFirebaseError(code: string): string {
  const errors: Record<string, string> = {
    "auth/user-not-found": "No account found with this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "An account with this email already exists. Please sign in.",
    "auth/weak-password": "Password must be at least 6 characters long.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled. Please try again.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
  };
  return errors[code] ?? "Something went wrong. Please try again.";
}
