<script lang="ts">
  import { wishlist } from "$lib/state/wishlist.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
</script>

<div class="max-w-7xl mx-auto mt-4">
  <h1
    class="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white"
  >
    Your Wishlist
  </h1>

  {#if wishlist.count === 0}
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl md:p-20 text-center shadow-sm p-5"
    >
      <div class="text-6xl mb-6 opacity-80">🤍</div>
      <h2 class="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
        Nothing saved yet
      </h2>
      <p
        class="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto"
      >
        Click the heart icon on any product to save it to your wishlist and
        review it later.
      </p>
      <a
        href="/products"
        class="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg inline-block"
      >
        Explore Products
      </a>
    </div>
  {:else}
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {#each wishlist.items as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  {/if}
</div>
