<script lang="ts">
  import { resolve } from "$app/paths";
  import { cart } from "$lib/state/cart.svelte";
  import { toast } from "$lib/state/toast.svelte";

  let isCheckingOut = $state(false);
  let hasCheckedOut = $state(false);

  async function handleCheckout() {
    isCheckingOut = true;

    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    cart.clear();
    isCheckingOut = false;
    hasCheckedOut = true;
    toast.add("Checkout completed successfully!");
  }
</script>

<div class="max-w-4xl mx-auto mt-8">
  {#if hasCheckedOut}
    <!-- Success Screen -->
    <div
      class="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm max-w-lg mx-auto transform transition-all"
    >
      <div class="text-6xl mb-6">🎉</div>
      <h2
        class="text-3xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight"
      >
        Order Confirmed
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mb-8">
        Thank you for your purchase! We're preparing your items for shipment.
      </p>
      <a
        href={resolve("/products")}
        class="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg inline-block"
      >
        Continue Shopping
      </a>
    </div>
  {:else if cart.items.length === 0}
    <!-- Empty Cart Screen -->
    <div
      class="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm"
    >
      <p class="text-slate-500 dark:text-slate-400 text-lg mb-6">
        Your cart is currently empty.
      </p>
      <a
        href={resolve("/products")}
        class="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all inline-block"
      >
        Start Shopping
      </a>
    </div>
  {:else}
    <!-- Active Cart Screen -->
    <h1
      class="text-3xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white"
    >
      Your Shopping Cart
    </h1>
    <div
      class="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden transition-colors"
    >
      <ul class="divide-y divide-slate-100 dark:divide-slate-800">
        {#each cart.items as item (item.product.id)}
          <li class="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div class="w-24 h-24 bg-white rounded-xl p-2 shrink-0">
              <img
                src={item.product.image}
                alt={item.product.title}
                class="w-full h-full object-contain"
              />
            </div>

            <div class="flex-1 text-center sm:text-left">
              <a
                href={resolve(`/product/${item.product.id}`)}
                class="font-medium hover:text-primary dark:text-slate-100 line-clamp-1"
                >{item.product.title}</a
              >
              <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
                ${item.product.price.toFixed(2)}
              </p>
            </div>

            <div
              class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-full px-2 py-1 border dark:border-slate-700"
            >
              <button
                onclick={() =>
                  cart.updateQuantity(item.product.id, item.quantity - 1)}
                class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                >−</button
              >
              <span class="w-4 text-center font-medium dark:text-white"
                >{item.quantity}</span
              >
              <button
                onclick={() =>
                  cart.updateQuantity(item.product.id, item.quantity + 1)}
                class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                >+</button
              >
            </div>

            <div
              class="w-24 text-right font-bold text-slate-900 dark:text-white text-lg"
            >
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button
              onclick={() => cart.remove(item.product.id)}
              class="text-red-500 hover:text-red-700 p-2 ml-2 transition"
              >✕</button
            >
          </li>
        {/each}
      </ul>
      <div
        class="bg-slate-50 dark:bg-slate-800/50 p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center border-t dark:border-slate-800 transition-colors"
      >
        <span class="text-slate-500 dark:text-slate-400 mb-2 sm:mb-0"
          >Subtotal ({cart.count} items)</span
        >
        <span class="text-3xl font-bold text-slate-900 dark:text-white"
          >${cart.total.toFixed(2)}</span
        >
      </div>
    </div>

    <div class="mt-8 flex justify-end">
      <button
        onclick={handleCheckout}
        disabled={isCheckingOut}
        class="w-full sm:w-auto bg-primary text-white px-12 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-wait flex justify-center items-center gap-2 text-lg"
      >
        {#if isCheckingOut}
          <span class="animate-spin text-xl">↻</span> Processing...
        {:else}
          Proceed to Checkout
        {/if}
      </button>
    </div>
  {/if}
</div>
