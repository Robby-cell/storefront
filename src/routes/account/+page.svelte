<script lang="ts">
  import { resolve } from "$app/paths";
  import { orders } from "$lib/state/orders.svelte";
  import { region } from "$lib/state/region.svelte";
</script>

<div class="max-w-5xl mx-auto py-8 lg:py-12">
  <!-- Dashboard Header -->
  <div
    class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8"
  >
    <div>
      <h1
        class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2"
      >
        My Account
      </h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        Manage your orders and preferences.
      </p>
    </div>

    <!-- Lifetime Spend Widget -->
    <div
      class="bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 text-right md:min-w-[200px]"
    >
      <p
        class="text-sm font-semibold text-primary uppercase tracking-wider mb-1"
      >
        Lifetime Spend
      </p>
      <p class="text-3xl font-extrabold text-slate-900 dark:text-white">
        {region.formatPrice(orders.lifetimeSpend)}
      </p>
    </div>
  </div>

  <!-- Order History Section -->
  <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
    Order History
  </h2>

  {#if orders.items.length === 0}
    <div
      class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm"
    >
      <div class="text-5xl mb-4 opacity-50">📦</div>
      <h3 class="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
        No orders yet
      </h3>
      <p class="text-slate-500 dark:text-slate-400 mb-6">
        When you buy something, your receipt will show up here.
      </p>
      <a
        href={resolve("/products")}
        class="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition-all"
        >Start Shopping</a
      >
    </div>
  {:else}
    <div class="space-y-6">
      {#each orders.items as order (order.id)}
        <div
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
        >
          <!-- Receipt Header -->
          <div
            class="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4"
          >
            <div class="flex gap-8">
              <div>
                <p
                  class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1"
                >
                  Order Placed
                </p>
                <p class="font-medium text-slate-900 dark:text-white text-sm">
                  {new Date(order.date).toLocaleDateString(
                    region.country === "US" ? "en-US" : "en-GB",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </p>
              </div>
              <div>
                <p
                  class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1"
                >
                  Total
                </p>
                <p class="font-medium text-slate-900 dark:text-white text-sm">
                  {region.formatPrice(order.total)}
                </p>
              </div>
              <div class="hidden sm:block">
                <p
                  class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1"
                >
                  Order #
                </p>
                <p class="font-medium text-slate-900 dark:text-white text-sm">
                  {order.id}
                </p>
              </div>
            </div>

            <span
              class="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              {order.status}
            </span>
          </div>

          <!-- Receipt Items -->
          <div class="p-6">
            <ul class="divide-y divide-slate-100 dark:divide-slate-800 -my-4">
              {#each order.items as item}
                <li class="py-4 flex gap-6 items-center">
                  <div
                    class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-xl p-2 shrink-0 border border-slate-100 dark:border-slate-700"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  <div class="flex-1">
                    <a
                      href={resolve("/product/{item.product.id}")}
                      class="font-medium text-slate-900 dark:text-white hover:text-primary transition line-clamp-2"
                    >
                      {item.product.title}
                    </a>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Qty: {item.quantity} × {region.formatPrice(
                        item.product.price,
                      )}
                    </p>
                  </div>
                  <div class="font-bold text-slate-900 dark:text-white text-lg">
                    {region.formatPrice(item.product.price * item.quantity)}
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
