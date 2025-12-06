import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthFormProps {
  onLogin: (email: string, password: string) => { success: boolean; error?: string };
  onSignup: (email: string, password: string) => { success: boolean; error?: string };
}

export function AuthForm({ onLogin, onSignup }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    // Simulate network delay for better UX
    await new Promise((r) => setTimeout(r, 500));

    const result = isLogin ? onLogin(email, password) : onSignup(email, password);
    
    if (result.success) {
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    } else {
      toast.error(result.error || 'An error occurred');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-3xl font-bold gradient-text">Investers</span>
          </div>
          <p className="text-muted-foreground">
            {isLogin ? 'Welcome back, investor' : 'Start your investment journey'}
          </p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8 shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>

            <Button type="submit" variant="glow" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="text-primary font-medium">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Demo: Create any account to get started
        </p>
      </div>
    </div>
  );
}
