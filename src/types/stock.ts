export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  sector: string;
}

export interface StockAlert {
  id: string;
  stockId: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  triggered: boolean;
  createdAt: string;
}

export default Stock;

export { Stock }