export interface Order {
  id: number;
  user_id: number;
  date: string;
  address: string;
  done: boolean;
  total: number;
}