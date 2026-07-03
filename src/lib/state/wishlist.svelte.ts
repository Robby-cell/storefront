import { browser } from "$app/environment";
import type { Product } from "$lib/types";

class WishlistState {
  items = $state<Product[]>([]);

  constructor() {
    if (browser) {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch (e) {}
      }
    }
  }

  get count() {
    return this.items.length;
  }

  // Check if a product is already favorited
  has(productId: number) {
    return this.items.some((i) => i.id === productId);
  }

  // Toggle a product in/out of the wishlist
  toggle(product: Product) {
    if (this.has(product.id)) {
      this.items = this.items.filter((i) => i.id !== product.id);
    } else {
      this.items.push(product);
    }
    this.save();
  }

  private save() {
    if (browser) {
      localStorage.setItem("wishlist", JSON.stringify(this.items));
    }
  }
}

export const wishlist = new WishlistState();
