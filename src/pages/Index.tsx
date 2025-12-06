import { AuthForm } from '@/components/AuthForm';
import { Dashboard } from '@/components/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading, login, signup, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm onLogin={login} onSignup={signup} />;
  }

  return <Dashboard user={user} onLogout={logout} />;
};

export default Index;
