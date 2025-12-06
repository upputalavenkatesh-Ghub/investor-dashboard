import { CryptoPrice } from '@/types/portfolio';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceCardProps {
  crypto: CryptoPrice;
  index: number;
}

export function PriceCard({ crypto, index }: PriceCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div
      className="glass rounded-xl p-4 hover:border-primary/30 transition-all duration-300 animate-slide-up group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {crypto.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg">
            ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              isPositive ? 'text-gain' : 'text-loss'
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
