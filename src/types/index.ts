export type CategoryType = "Fish" | "Poultry" | "Rice" | "Beans" | "Other";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
  subCategory?: string;
  description: string;
  stock: number;
  unit: string;
  image: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: "unpaid" | "paid";
  createdAt: string;
}

export interface Category {
  id: string;
  name: CategoryType;
  image: string;
}
