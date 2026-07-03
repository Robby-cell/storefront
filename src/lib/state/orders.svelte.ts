import { browser } from "$app/environment";
import type { CartItem } from "$lib/types";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}

class OrderState {
  items = $state<Order[]>([]);

  constructor() {
    if (browser) {
      const saved = localStorage.getItem("orders");
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch (e) {}
      }
    }
  }

  get lifetimeSpend() {
    return this.items.reduce((acc, order) => acc + order.total, 0);
  }

  createOrder(
    cartItems: CartItem[],
    subtotal: number,
    shipping: number,
    tax: number,
    total: number,
  ) {
    const newOrder: Order = {
      id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      date: new Date().toISOString(),
      items: JSON.parse(JSON.stringify(cartItems)),
      subtotal,
      shipping,
      tax,
      total,
      status: "Processing",
    };

    this.items.unshift(newOrder);
    this.save();
    return newOrder.id;
  }

  getOrder(id: string) {
    return this.items.find((o) => o.id === id);
  }

  private save() {
    if (browser) {
      localStorage.setItem("orders", JSON.stringify(this.items));
    }
  }
}

export const orders = new OrderState();
