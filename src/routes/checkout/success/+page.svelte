<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/stores";
  import { orders } from "$lib/state/orders.svelte";
  import { region } from "$lib/state/region.svelte";

  let orderId = $derived($page.url.searchParams.get("id") || "");
  let order = $derived(orders.getOrder(orderId));

  let deliveryDate = $derived(() => {
    if (!order) {
      return ``;
    }
    const d = new Date(order.date);
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString(region.country === "US" ? "en-US" : "en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });
</script>

<div
  class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12"
>
  <div
    class="max-w-xl w-full bg-white dark:bg-slate-900 p-10 md:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
  >
    <div
      class="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-5xl mx-auto mb-8"
    >
      ✓
    </div>

    <h1
      class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
    >
      Payment Successful!
    </h1>

    {#if order}
      <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
        Thank you! Your receipt for <strong
          class="text-slate-900 dark:text-white"
          >{region.formatPrice(order.total)}</strong
        > has been saved to your account.
      </p>

      <div
        class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 mb-10 text-left"
      >
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Order Number
            </p>
            <p class="font-bold text-slate-900 dark:text-white">{order.id}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Estimated Delivery
            </p>
            <p class="font-bold text-slate-900 dark:text-white">
              {deliveryDate()}
            </p>
          </div>
        </div>
      </div>
    {:else}
      <p class="text-red-500 mb-8">Order details could not be found.</p>
    {/if}

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={resolve("/account")}
        class="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/20"
      >
        View My Orders
      </a>
      <a
        href={resolve("/products")}
        class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
      >
        Continue Shopping
      </a>
    </div>
  </div>
</div>
