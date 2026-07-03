import { browser } from "$app/environment";
import type { Product } from "$lib/types";

class RecentState {
  items = $state<Product[]>([]);

  constructor() {
    if (browser) {
      const saved = localStorage.getItem("recent");
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch (e) {}
      }
    }
  }

  add(product: Product) {
    // Remove the product if it's already in the list to prevent duplicates
    this.items = this.items.filter((p) => p.id !== product.id);

    // Add it to the very front of the array
    this.items.unshift(product);

    // Keep only the 10 most recent items to save storage
    if (this.items.length > 10) {
      this.items.pop();
    }
    this.save();
  }

  private save() {
    if (browser) {
      localStorage.setItem("recent", JSON.stringify(this.items));
    }
  }
}

export const recent = new RecentState();
