import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Church, LogIn, AlertCircle } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi.");
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Username atau password salah. Gunakan admin / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Church className="h-7 w-7 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Login Admin
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Masuk ke dashboard manajemen gereja
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              <LogIn className="h-4 w-4 mr-2" />
              Masuk
            </Button>
          </form>

          {/* Hint */}
          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground text-center">
            Demo: username <strong>admin</strong> · password <strong>admin123</strong>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
