import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddAssetFormProps {
  onAdd: (name: string, amount: number, symbol: string) => void;
}

export function AddAssetForm({ onAdd }: AddAssetFormProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !symbol.trim() || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    onAdd(name.trim(), numAmount, symbol.trim());
    toast.success(`${name} added to portfolio`);
    
    setName('');
    setSymbol('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          placeholder="Asset name (e.g., Bitcoin)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Symbol (e.g., BTC)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          maxLength={10}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="any"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        <Plus className="w-4 h-4" />
        Add Asset
      </Button>
    </form>
  );
}
