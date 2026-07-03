import { browser } from "$app/environment";
import type { CartItem, Product } from "$lib/types";

class CartState {
  items = $state<CartItem[]>([]);
  isOpen = $state(false); // Tracks if drawer is open

  constructor() {
    if (browser) {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch (e) {}
      }
    }
  }

  get total() {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }

  get count() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  private save() {
    if (browser) {
      localStorage.setItem("cart", JSON.stringify(this.items));
    }
  }

  // Drawer controls
  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

  add(product: Product) {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.save();
  }

  remove(productId: number) {
    this.items = this.items.filter((i) => i.product.id !== productId);
    this.save();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.remove(productId);
      }
    }
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }
}

export const cart = new CartState();
