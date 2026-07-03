<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import ProductSkeleton from "$lib/components/ProductSkeleton.svelte";
  import type { Product } from "$lib/types";

  let { data } = $props();

  // Unwrapping the streamed promise
  let products = $state<Product[]>([]);
  let isLoading = $state(true);

  $effect(() => {
    data.streamed.products.then((res) => {
      products = res;
      isLoading = false;
    });
  });

  // UI State Controls
  let searchQuery = $state("");
  let categoryFilter = $state("all");
  let sortBy = $state("default");

  // Svelte 5 block derivation: filters AND sorts reactively
  let filteredProducts = $derived.by(() => {
    // 1. Filter
    let result = products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // 2. Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  });

  let categories = $derived([
    "all",
    ...new Set(products.map((p) => p.category)),
  ]);
</script>

<!-- The Control Bar (Search, Category, and Sort) -->
<div
  class="mb-8 flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 p-2 md:pl-4 rounded-2xl md:rounded-full shadow-sm border border-slate-200 dark:border-slate-800 transition-colors"
>
  <!-- Search (Row 1 on mobile) -->
  <div
    class="w-full flex-1 flex items-center gap-2 pb-2 md:pb-0 border-b md:border-b-0 border-slate-100 dark:border-slate-800 px-2 md:px-0"
  >
    <span class="text-slate-400">🔍</span>
    <input
      type="text"
      placeholder="Search catalog..."
      bind:value={searchQuery}
      class="w-full bg-transparent outline-none py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400"
    />
  </div>

  <!-- Mobile: Group Category & Sort side-by-side (Row 2 on mobile) -->
  <div class="w-full md:w-auto flex flex-row items-center pt-2 md:pt-0">
    <!-- Category Dropdown -->
    <div
      class="w-1/2 md:w-auto md:border-l border-slate-200 dark:border-slate-800 border-r md:border-r-0 md:pl-2 pr-2 md:pr-0"
    >
      <div class="relative w-full md:w-40">
        <select
          bind:value={categoryFilter}
          class="w-full pl-3 pr-8 py-2 appearance-none bg-slate-100 dark:bg-slate-800 md:rounded-full rounded-xl outline-none focus:ring-2 focus:ring-primary cursor-pointer capitalize text-slate-900 dark:text-slate-100 border-none transition-colors text-sm"
        >
          {#each categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
        <div
          class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            ><path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
        </div>
      </div>
    </div>

    <!-- Sort Dropdown -->
    <div class="w-1/2 md:w-auto pl-2 md:pl-2">
      <div class="relative w-full md:w-44 pr-2 md:pr-0">
        <select
          bind:value={sortBy}
          class="w-full pl-3 pr-8 py-2 appearance-none bg-slate-100 dark:bg-slate-800 md:rounded-full rounded-xl outline-none focus:ring-2 focus:ring-primary cursor-pointer text-slate-900 dark:text-slate-100 border-none transition-colors text-sm"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low - High</option>
          <option value="price-desc">Price: High - Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        <div
          class="absolute right-4 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            ><path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
        </div>
      </div>
    </div>
  </div>
</div>

<!-- The Grid -->
<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
>
  {#if isLoading}
    <!-- Show 8 pulsing skeletons while fetching -->
    {#each Array(8) as _}
      <ProductSkeleton />
    {/each}
  {:else}
    {#each filteredProducts as product (product.id)}
      <ProductCard {product} />
    {/each}
  {/if}
</div>

{#if !isLoading && filteredProducts.length === 0}
  <div
    class="text-center py-20 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800"
  >
    <div class="text-4xl mb-3">🔍</div>
    <p class="font-medium text-lg">No products found matching your criteria.</p>
    <button
      onclick={() => {
        searchQuery = "";
        categoryFilter = "all";
        sortBy = "default";
      }}
      class="mt-4 text-primary hover:underline font-medium"
    >
      Clear all filters
    </button>
  </div>
{/if}
