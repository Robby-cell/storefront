<script lang="ts">
  import { storeConfig } from "$lib/config";
  import { recent } from "$lib/state/recent.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { resolve } from "$app/paths";
</script>

<section
  class="min-h-[60vh] flex items-center justify-center text-center px-4 pt-10 pb-20"
>
  <div class="max-w-3xl flex flex-col items-center gap-4 md:gap-6">
    <h1
      class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors leading-tight"
    >
      Welcome to <span class="text-primary">{storeConfig.name}</span>.
    </h1>
    <p
      class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 transition-colors max-w-2xl"
    >
      Discover premium electronics, elegant jewelry, and high-quality clothing.
      Fetches instantly, looks beautiful on every screen.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
      <a
        href={resolve("/products")}
        class="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/20 flex justify-center"
      >
        Start Shopping
      </a>
    </div>
  </div>
</section>

<!-- Personalize the homepage if they have browsing history! -->
{#if recent.items.length > 0}
  <section class="pb-20 max-w-7xl mx-auto px-4 w-full">
    <div
      class="flex justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-4"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
        Jump back in
      </h2>
      <a
        href={resolve("/products")}
        class="text-primary font-medium hover:underline text-sm md:text-base mb-1"
        >View all &rarr;</a
      >
    </div>

    <!-- Swipeable horizontal scroll for Mobile, Grid for Desktop -->
    <div
      class="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:-mx-0 gap-4"
    >
      {#each recent.items.slice(0, 4) as recentProd (recentProd.id)}
        <div class="w-[75vw] sm:w-[320px] lg:w-auto shrink-0 snap-start flex">
          <div class="w-full">
            <ProductCard product={recentProd} />
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}
