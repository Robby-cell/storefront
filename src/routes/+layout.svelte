<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import { cart } from "$lib/state/cart.svelte";
  import { region, type CountryCode } from "$lib/state/region.svelte";
  import { toast } from "$lib/state/toast.svelte";
  import { theme } from "$lib/state/theme.svelte";
  import { wishlist } from "$lib/state/wishlist.svelte";
  import { storeConfig } from "$lib/config";

  // Import Svelte's animation engine
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let { children } = $props();
</script>

<nav
  class="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm z-40 transition-colors duration-300"
>
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <a
      href="/"
      class="font-bold text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1"
    >
      {storeConfig.name}<span class="text-primary">.</span>
    </a>

    <div class="flex items-center gap-4 sm:gap-8">
      <div
        class="hidden sm:flex items-center gap-3 border-r border-slate-200 dark:border-slate-700 pr-4"
      >
        <!-- Region -->
        <select
          value={region.country}
          onchange={(e) =>
            region.setCountry(e.currentTarget.value as CountryCode)}
          class="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer appearance-none hover:text-primary transition"
        >
          <option value="GB">🇬🇧 GBP (£)</option>
          <option value="US">🇺🇸 USD ($)</option>
          <option value="EU">🇪🇺 EUR (€)</option>
        </select>

        <!-- Theme Controls -->
        <button
          onclick={() =>
            theme.setMode(theme.mode === "dark" ? "light" : "dark")}
          class="text-xl opacity-70 hover:opacity-100 transition"
        >
          {theme.mode === "dark" ? "☀️" : "🌙"}
        </button>
        <div class="flex gap-2 items-center">
          <button
            aria-label="Blue"
            onclick={() => theme.setAccent("blue")}
            class="w-5 h-5 rounded-full bg-blue-600 border-2 hover:scale-110 transition-all {theme.accent ===
            'blue'
              ? 'border-white dark:border-slate-950 ring-2 ring-blue-600'
              : 'border-transparent'}"
          ></button>
          <button
            aria-label="Emerald"
            onclick={() => theme.setAccent("emerald")}
            class="w-5 h-5 rounded-full bg-emerald-600 border-2 hover:scale-110 transition-all {theme.accent ===
            'emerald'
              ? 'border-white dark:border-slate-950 ring-2 ring-emerald-600'
              : 'border-transparent'}"
          ></button>
          <button
            aria-label="Rose"
            onclick={() => theme.setAccent("rose")}
            class="w-5 h-5 rounded-full bg-rose-600 border-2 hover:scale-110 transition-all {theme.accent ===
            'rose'
              ? 'border-white dark:border-slate-950 ring-2 ring-rose-600'
              : 'border-transparent'}"
          ></button>
          <button
            aria-label="Zinc"
            onclick={() => theme.setAccent("zinc")}
            class="w-5 h-5 rounded-full bg-zinc-800 dark:bg-slate-100 border-2 hover:scale-110 transition-all {theme.accent ===
            'zinc'
              ? 'border-white dark:border-slate-950 ring-2 ring-zinc-500 dark:ring-slate-300'
              : 'border-transparent'}"
          ></button>
        </div>
      </div>

      <a
        href="/products"
        class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition"
        >Shop</a
      >

      <!-- account button -->
      <a
        href="/account"
        class="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 relative cursor-pointer hover:text-primary transition group mr-2"
        aria-label="My Account"
      >
        <span
          class="text-xl leading-none group-hover:scale-110 transition-transform"
        >
          👤
        </span>
      </a>

      <!-- wishlist button -->
      <a
        href="/wishlist"
        class="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 relative cursor-pointer hover:text-rose-500 transition group mr-3"
      >
        <span
          class="text-xl leading-none group-hover:scale-110 transition-transform"
        >
          {wishlist.count > 0 ? "❤️" : "🤍"}
        </span>
        {#if wishlist.count > 0}
          <span
            class="bg-rose-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center absolute -top-2 -right-3 shadow-sm"
          >
            {wishlist.count}
          </span>
        {/if}
      </a>

      <!-- A button that opens the drawer -->
      <button
        onclick={() => cart.toggle()}
        class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition flex items-center gap-1 relative focus:outline-none"
      >
        Cart
        {#if cart.count > 0}
          <span
            class="bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center absolute -top-2 -right-4 shadow-sm"
          >
            {cart.count}
          </span>
        {/if}
      </button>
    </div>
  </div>
</nav>

<div class="flex flex-col min-h-screen">
  <!-- Main Content grows to push footer down -->
  <main class="max-w-7xl w-full mx-auto px-4 py-8 flex-1">
    {@render children()}
  </main>

  <!-- Inject Footer -->
  <Footer />
</div>

<!-- SLIDE-OUT CART DRAWER -->
{#if cart.isOpen}
  <!-- Backdrop Filter -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-50"
    onclick={() => cart.close()}
  ></div>

  <!-- Drawer Panel -->
  <div
    transition:fly={{ x: "100%", duration: 350, easing: cubicOut, opacity: 1 }}
    class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
  >
    <!-- Drawer Header -->
    <div
      class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center"
    >
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">
        Your Cart <span class="text-slate-400 text-sm font-medium ml-2"
          >({cart.count})</span
        >
      </h2>
      <button
        onclick={() => cart.close()}
        class="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-xl leading-none"
        >&times;</button
      >
    </div>

    <!-- Drawer Items -->
    <div class="flex-1 overflow-y-auto p-6">
      {#if cart.items.length === 0}
        <div
          class="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 space-y-4"
        >
          <div class="text-5xl opacity-50">🛒</div>
          <p>Your cart is empty.</p>
          <button
            onclick={() => cart.close()}
            class="text-primary font-medium hover:underline"
            >Continue shopping</button
          >
        </div>
      {:else}
        <ul class="divide-y divide-slate-100 dark:divide-slate-800 -my-4">
          {#each cart.items as item (item.product.id)}
            <li class="py-6 flex gap-4">
              <div
                class="w-20 h-20 bg-white rounded-lg p-2 shrink-0 border border-slate-100 dark:border-slate-800"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  class="w-full h-full object-contain"
                />
              </div>

              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <a
                    href="/product/{item.product.id}"
                    onclick={() => cart.close()}
                    class="font-medium text-sm hover:text-primary dark:text-slate-100 line-clamp-2 leading-snug"
                    >{item.product.title}</a
                  >
                  <!-- Shows Unit Price -->
                  <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    {region.formatPrice(item.product.price)} each
                  </p>
                </div>

                <div class="flex items-end justify-between mt-2">
                  <div
                    class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-full px-2 py-0.5 border dark:border-slate-700"
                  >
                    <button
                      onclick={() =>
                        cart.updateQuantity(item.product.id, item.quantity - 1)}
                      class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition active:scale-90"
                      >−</button
                    >
                    <span
                      class="w-4 text-center text-xs font-medium dark:text-white"
                      >{item.quantity}</span
                    >
                    <button
                      onclick={() =>
                        cart.updateQuantity(item.product.id, item.quantity + 1)}
                      class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition active:scale-90"
                      >+</button
                    >
                  </div>

                  <div class="flex flex-col items-end">
                    <!-- Shows multiplied total for this specific item -->
                    <span
                      class="font-bold text-slate-900 dark:text-white leading-none"
                    >
                      {region.formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onclick={() => cart.remove(item.product.id)}
                      class="text-red-500 hover:text-red-700 text-[11px] font-medium transition mt-1.5"
                      >Remove</button
                    >
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Drawer Footer (Checkout) -->
    {#if cart.items.length > 0}
      <div
        class="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
      >
        <div class="flex justify-between items-center mb-4">
          <span class="text-slate-500 dark:text-slate-400 font-medium"
            >Subtotal</span
          >
          <span class="text-2xl font-bold text-slate-900 dark:text-white"
            >{region.formatPrice(cart.total)}</span
          >
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Shipping and taxes calculated at checkout.
        </p>

        <a
          href="/checkout"
          onclick={() => cart.close()}
          class="w-full bg-primary text-white py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/25 flex justify-center items-center gap-2"
        >
          Proceed to Checkout
        </a>
      </div>
    {/if}
  </div>
{/if}

<!-- Toast Notifications -->
<div
  class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm flex flex-col gap-2 z-[60] pointer-events-none"
>
  {#each toast.toasts as t (t.id)}
    <div
      class="bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-700 text-sm font-medium animate-slide-up flex items-center gap-3"
    >
      <span
        class="bg-primary/20 text-primary-light rounded-full p-1 flex items-center justify-center"
        >✓</span
      >
      {t.message}
    </div>
  {/each}
</div>
