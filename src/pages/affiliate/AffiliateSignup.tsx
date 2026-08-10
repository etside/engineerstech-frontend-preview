import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { affiliateApi } from "@/lib/affiliateApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

const AffiliateSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", password_confirmation: "", website: "", bio: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await affiliateApi.register(form);
      localStorage.setItem("affiliate_token", token);
      navigate("/affiliate");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <SEO title="Affiliate Sign Up" description="Join the engineersTech affiliate program and earn commissions" path="/affiliate/signup" />
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Join Affiliate Program</h1>
          <p className="text-muted-foreground text-sm mt-1">Earn commissions by referring clients to engineersTech</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 glass-card p-6 rounded-xl">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="text-sm font-medium">Full Name *</label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} required className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Website</label>
            <Input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Input value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell us about your audience" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Password *</label>
            <Input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password *</label>
            <Input type="password" value={form.password_confirmation} onChange={(e) => update("password_confirmation", e.target.value)} required className="mt-1" />
          </div>
          <Button type="submit" className="w-full gradient-bg border-0" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/affiliate/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AffiliateSignup;
