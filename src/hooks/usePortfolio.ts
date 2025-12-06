import { useState, useEffect } from 'react';
import { Asset } from '@/types/portfolio';

const STORAGE_KEY = 'investers_portfolio';

export function usePortfolio() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAssets(JSON.parse(stored));
    }
  }, []);

  const saveAssets = (newAssets: Asset[]) => {
    setAssets(newAssets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAssets));
  };

  const addAsset = (name: string, amount: number, symbol: string) => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      name,
      amount,
      symbol: symbol.toUpperCase(),
    };
    saveAssets([...assets, newAsset]);
  };

  const removeAsset = (id: string) => {
    saveAssets(assets.filter((a) => a.id !== id));
  };

  const updateAsset = (id: string, amount: number) => {
    saveAssets(
      assets.map((a) => (a.id === id ? { ...a, amount } : a))
    );
  };

  return { assets, addAsset, removeAsset, updateAsset };
}
