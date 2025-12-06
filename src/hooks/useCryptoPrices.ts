import { useState, useEffect } from 'react';
import { CryptoPrice } from '@/types/portfolio';

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple'];

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTO_IDS.join(',')}&order=market_cap_desc&sparkline=false`
      );
      
      if (!res.ok) throw new Error('Failed to fetch prices');
      
      const data = await res.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      setError('Unable to load prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error, refetch: fetchPrices };
}
