import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mimic login
    setTimeout(() => {
      setLoading(false);
      toast.success("Login Successful", {
        description: "Welcome back, Admin."
      });
      navigate('/admin');
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to access the console.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl shadow-blue-500/5 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Admin Email</Label>
            <Input id="email" type="email" placeholder="admin@freshandfrost.com" required className="h-12" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-blue-600 font-medium">Forgot?</a>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required className="h-12" />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl"
          >
            {loading ? "Verifying..." : "Enter Workspace"} <ArrowRight size={18} className="ml-2" />
          </Button>

          <p className="text-center text-xs text-slate-400">
            Restricted access. All attempts are logged.
          </p>
        </form>
      </div>
    </div>
  );
}
