import { Asset } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Trash2, Wallet } from 'lucide-react';

interface PortfolioTableProps {
  assets: Asset[];
  onRemove: (id: string) => void;
}

export function PortfolioTable({ assets, onRemove }: PortfolioTableProps) {
  if (assets.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
          <Wallet className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No assets yet</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Add your first asset to start tracking
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {assets.map((asset, index) => (
        <div
          key={asset.id}
          className="glass rounded-xl p-4 flex items-center justify-between group hover:border-primary/30 transition-all animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {asset.symbol.slice(0, 2)}
            </div>
            <div>
              <h4 className="font-semibold">{asset.name}</h4>
              <p className="text-sm text-muted-foreground">{asset.symbol}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-lg">{asset.amount}</p>
              <p className="text-xs text-muted-foreground">Holdings</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(asset.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
