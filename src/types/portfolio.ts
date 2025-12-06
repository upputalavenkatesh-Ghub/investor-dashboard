export interface Asset {
  id: string;
  name: string;
  amount: number;
  symbol: string;
}

export interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface User {
  email: string;
}
