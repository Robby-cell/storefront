<script lang="ts">
  import type { Product } from "$lib/types";
  import { cart } from "$lib/state/cart.svelte";
  import { region } from "$lib/state/region.svelte";
  import { toast } from "$lib/state/toast.svelte";
  import { wishlist } from "$lib/state/wishlist.svelte";
  import { resolve } from "$app/paths";

  let { product }: { product: Product } = $props();

  function handleAddToCart(e: Event) {
    e.preventDefault();
    e.stopPropagation(); // <-- This stops the click from hitting the <a> tag!
    cart.add(product);
    toast.add(`Added ${product.title.substring(0, 20)}... to cart`);
  }

  function handleWishlist(e: Event) {
    e.preventDefault();
    e.stopPropagation(); // <-- This stops the click from hitting the <a> tag!
    wishlist.toggle(product);
    if (wishlist.has(product.id)) {
      toast.add(`Saved to favorites`);
    }
  }
</script>

<div
  class="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary dark:hover:border-primary transition-all duration-300 h-full relative"
>
  <!-- Quick Favorite Button -->
  <button
    onclick={handleWishlist}
    class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all text-lg"
    aria-label="Toggle favorite"
  >
    {wishlist.has(product.id) ? "❤️" : "🤍"}
  </button>

  <a
    href={resolve("/product/{product.id}")}
    class="flex-1 flex flex-col focus:outline-none"
  >
    <div
      class="h-44 w-full flex items-center justify-center mb-5 relative bg-white rounded-xl overflow-hidden p-2"
    >
      <img
        src={product.image}
        alt={product.title}
        class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <p class="text-[10px] font-bold text-primary uppercase tracking-widest">
        {product.category}
      </p>
      <h3
        class="font-medium text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug"
      >
        {product.title}
      </h3>
      <div
        class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2"
      >
        <span class="text-yellow-400 text-sm leading-none">★</span>
        {product.rating.rate}
      </div>
    </div>
  </a>

  <div
    class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800"
  >
    <p class="font-bold text-lg text-slate-900 dark:text-white">
      {region.formatPrice(product.price)}
    </p>

    <button
      onclick={handleAddToCart}
      class="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary dark:hover:bg-primary dark:hover:text-white active:scale-95 transition-all duration-200 shadow-sm"
    >
      + Add
    </button>
  </div>
</div>
