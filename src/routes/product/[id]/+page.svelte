<script lang="ts">
  import { untrack } from "svelte";
  import { cart } from "$lib/state/cart.svelte";
  import { toast } from "$lib/state/toast.svelte";
  import { wishlist } from "$lib/state/wishlist.svelte";
  import { recent } from "$lib/state/recent.svelte";
  import { region } from "$lib/state/region.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { storeConfig } from "$lib/config"; // Needed for SEO store name
  import { resolve } from "$app/paths";

  let { data } = $props();
  let product = $derived(data.product);
  let related = $derived(data.related);

  $effect(() => {
    if (product) {
      untrack(() => recent.add(product));
    }
  });

  // Image Zoom State
  let isZoomed = $state(false);
  let mouseX = $state(50);
  let mouseY = $state(50);

  function handleMouseMove(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    const { left, top, width, height } = target.getBoundingClientRect();
    // Calculate percentage of mouse position inside the box
    mouseX = ((e.clientX - left) / width) * 100;
    mouseY = ((e.clientY - top) / height) * 100;
  }

  function handleAddToCart(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    cart.add(product);
    toast.add(`Added ${product.title.substring(0, 20)}... to cart`);
  }

  function handleWishlist(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle(product);
    if (wishlist.has(product.id)) {
      toast.add(`Saved to favorites`);
    }
  }
</script>

<!-- Dynamic SEO Meta Tags -->
<svelte:head>
  <title>{product.title} | {storeConfig.name}</title>
  <meta name="description" content={product.description.substring(0, 160)} />

  <!-- OpenGraph (Facebook, iMessage, Slack, etc.) -->
  <meta property="og:title" content={product.title} />
  <meta
    property="og:description"
    content={product.description.substring(0, 160)}
  />
  <meta property="og:image" content={product.image} />
  <meta property="og:type" content="product" />
  <meta
    property="product:price:amount"
    content={(
      product.price *
      (region.country === "US" ? 1 : region.country === "GB" ? 0.79 : 0.92)
    ).toString()}
  />
  <meta
    property="product:price:currency"
    content={region.country === "GB"
      ? "GBP"
      : region.country === "EU"
        ? "EUR"
        : "USD"}
  />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={product.title} />
  <meta name="twitter:image" content={product.image} />
</svelte:head>

<!-- Breadcrumb Navigation -->
<nav
  class="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6 mt-2"
>
  <a href={resolve("/")} class="hover:text-primary transition">Home</a>
  <span class="mx-2">›</span>
  <a href={resolve("/products")} class="hover:text-primary transition">Shop</a>
  <span class="mx-2">›</span>
  <span class="capitalize">{product.category}</span>
</nav>

<!-- Main Product View -->
<div
  class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-12 flex flex-col md:flex-row gap-12 transition-colors"
>
  <!-- Image Section -->
  <div
    class="w-full md:w-1/2 relative group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 flex items-center justify-center overflow-hidden h-[400px] md:h-[500px]"
  >
    <button
      onclick={handleWishlist}
      class="absolute top-6 right-6 text-3xl hover:scale-110 active:scale-95 transition-transform z-20"
      aria-label="Favorite"
    >
      {wishlist.has(product.id) ? "❤️" : "🤍"}
    </button>

    <!-- Invisible overlay to capture mouse movements reliably -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="absolute inset-0 z-10 cursor-zoom-in"
      onmousemove={handleMouseMove}
      onmouseenter={() => (isZoomed = true)}
      onmouseleave={() => (isZoomed = false)}
    ></div>

    <!-- The Image: Scales up by 2.2x and moves its origin based on the mouse position! -->
    <img
      src={product.image}
      alt={product.title}
      class="w-full h-full object-contain transition-transform duration-200 ease-out mix-blend-multiply dark:mix-blend-normal pointer-events-none"
      style="
				transform: scale({isZoomed ? 2.2 : 1}); 
				transform-origin: {mouseX}% {mouseY}%;
			"
    />
  </div>

  <!-- Details Section -->
  <div class="w-full md:w-1/2 flex flex-col justify-center">
    <p class="text-sm font-bold text-primary uppercase tracking-widest mb-2">
      {product.category}
    </p>
    <h1
      class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4"
    >
      {product.title}
    </h1>

    <div class="flex items-center gap-3 mb-6">
      <div
        class="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-yellow-200 dark:border-yellow-700/30"
      >
        ★ {product.rating.rate}
      </div>
      <span class="text-slate-500 dark:text-slate-400 text-sm"
        >Based on {product.rating.count} reviews</span
      >
    </div>

    <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
      {product.description}
    </p>

    <div class="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
      <p class="text-4xl font-bold text-slate-900 dark:text-white mb-6">
        {region.formatPrice(product.price)}
      </p>

      <div class="flex gap-4">
        <button
          onclick={handleAddToCart}
          class="flex-1 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg"
        >
          Add to Cart
        </button>

        <!-- Mobile-friendly massive favorite button for quick-adding from detail page -->
        <button
          onclick={handleWishlist}
          class="w-16 h-[56px] flex items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-700 text-2xl hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-95 transition-all"
        >
          {wishlist.has(product.id) ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Related Products Section -->
{#if related.length > 0}
  <div class="mt-20 mb-10">
    <h2
      class="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4"
    >
      You might also like
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each related as relProd (relProd.id)}
        <ProductCard product={relProd} />
      {/each}
    </div>
  </div>
{/if}

<!-- Only show if there are OTHER items in the history besides this current one -->
{#if recent.items.length > 1}
  <div class="mt-20 mb-10">
    <h2
      class="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4"
    >
      Recently viewed
    </h2>

    <!-- 
			MOBILE MAGIC: 
			On small screens, this is a horizontal scrolling area (overflow-x-auto snap-x). 
			On lg screens, it snaps back into a standard grid. 
			-mx-4 px-4 allows the scroll to hit the edges of the phone screen nicely!
		-->
    <div
      class="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:-mx-0 gap-4"
    >
      {#each recent.items
        .filter((p) => p.id !== product.id)
        .slice(0, 4) as recentProd (recentProd.id)}
        <div class="w-[75vw] sm:w-[320px] lg:w-auto shrink-0 snap-start flex">
          <!-- Wrapper ensures the cards stretch to equal heights -->
          <div class="w-full">
            <ProductCard product={recentProd} />
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
