import { TrendingUp, LogOut, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceCard } from '@/components/PriceCard';
import { PortfolioTable } from '@/components/PortfolioTable';
import { AddAssetForm } from '@/components/AddAssetForm';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { User } from '@/types/portfolio';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const { prices, loading, error, refetch } = useCryptoPrices();
  const { assets, addAsset, removeAsset } = usePortfolio();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">Investers</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}!
          </h1>
          <p className="text-muted-foreground">Here's your investment overview</p>
        </div>

        {/* Live Prices Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Live Prices</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={refetch}
              disabled={loading}
              className="text-muted-foreground hover:text-primary"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
          </div>

          {error ? (
            <div className="glass rounded-xl p-6 text-center text-destructive">
              {error}
            </div>
          ) : loading && prices.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="glass rounded-xl p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-secondary rounded w-24" />
                      <div className="h-3 bg-secondary rounded w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prices.map((crypto, index) => (
                <PriceCard key={crypto.id} crypto={crypto} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Portfolio Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Your Portfolio</h2>
          
          <div className="glass rounded-2xl p-6 space-y-6">
            <AddAssetForm onAdd={addAsset} />
            <div className="border-t border-border/50 pt-6">
              <PortfolioTable assets={assets} onRemove={removeAsset} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
