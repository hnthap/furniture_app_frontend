import { Product } from "./Product";

export interface OrderedItem {
  order_id: number;
  product_id: number;
  count: number;
  total_price: number;
  id: number;
  product: Product;
}