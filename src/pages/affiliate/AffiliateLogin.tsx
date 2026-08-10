import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { affiliateApi } from "@/lib/affiliateApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

const AffiliateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await affiliateApi.login(email, password);
      localStorage.setItem("affiliate_token", token);
      navigate("/affiliate");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SEO title="Affiliate Login" description="Login to your engineersTech affiliate account" path="/affiliate/login" />
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Affiliate Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your affiliate dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 glass-card p-6 rounded-xl">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
          </div>
          <Button type="submit" className="w-full gradient-bg border-0" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/affiliate/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AffiliateLogin;
