<script lang="ts">
  import { cart } from "$lib/state/cart.svelte";
  import { orders } from "$lib/state/orders.svelte";
  import { region, type CountryCode } from "$lib/state/region.svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  $effect(() => {
    if (browser && cart.items.length === 0) {
      goto("/products");
    }
  });

  let isProcessing = $state(false);

  // Math uses USD base under the hood, but formats locally
  let subtotal = $derived(cart.total);
  let shipping = $derived(subtotal > 100 ? 0 : 12.99);
  let tax = $derived(subtotal * 0.08);
  let finalTotal = $derived(subtotal + shipping + tax);

  // DYNAMIC REGION LABELS
  let stateLabel = $derived(
    region.country === "GB"
      ? "County"
      : region.country === "US"
        ? "State"
        : "Province/Region",
  );
  // Counties/Provinces are often optional outside the US.
  // So we only need to force this if the region is the US, otherwise, optional
  let isStateRequired = $derived(region.country === "US");
  let postalLabel = $derived(
    region.country === "GB"
      ? "Postcode"
      : region.country === "US"
        ? "ZIP Code"
        : "Postal Code",
  );

  const inputClass =
    "w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none";
  const labelClass =
    "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-0.5";

  async function handlePayment(e: SubmitEvent) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  async function handlePlaceOrder(e: SubmitEvent) {
    e.preventDefault();
    isProcessing = true;

    // Simulate payment delay
    // Can be replaced with real payment processing logic
    await handlePayment(e);

    // 1. Save the order to our new state
    const orderId = orders.createOrder(
      cart.items,
      subtotal,
      shipping,
      tax,
      finalTotal,
    );

    // 2. Clear cart
    cart.clear();

    // 3. Redirect with the real Order ID in the URL
    goto(`/checkout/success?id=${orderId}`);
  }
</script>

{#snippet orderSummary()}
  <div
    class="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white"
  >
    <h2 class="text-xl font-bold mb-6">Order Summary</h2>

    <ul
      class="divide-y divide-slate-200 dark:divide-slate-700 mb-6 max-h-[40vh] overflow-y-auto pr-2"
    >
      {#each cart.items as item}
        <li class="py-4 flex gap-4 items-center">
          <div
            class="w-16 h-16 bg-white dark:bg-slate-700 rounded-xl p-2 border border-slate-200 dark:border-slate-600 shrink-0 relative shadow-sm"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
            />
            <span
              class="absolute -top-2 -right-2 bg-slate-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
              >{item.quantity}</span
            >
          </div>
          <div class="flex-1">
            <p class="font-medium text-sm line-clamp-2 leading-snug">
              {item.product.title}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {region.formatPrice(item.product.price)} each
            </p>
          </div>
          <div class="font-bold">
            {region.formatPrice(item.product.price * item.quantity)}
          </div>
        </li>
      {/each}
    </ul>

    <div
      class="space-y-3 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-6"
    >
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span class="font-medium text-slate-900 dark:text-white"
          >{region.formatPrice(subtotal)}</span
        >
      </div>
      <div class="flex justify-between items-center">
        <span>Shipping</span>
        {#if shipping === 0}
          <span
            class="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
            >Free</span
          >
        {:else}
          <span class="font-medium text-slate-900 dark:text-white"
            >{region.formatPrice(shipping)}</span
          >
        {/if}
      </div>
      <div class="flex justify-between">
        <span>Estimated Taxes</span>
        <span class="font-medium text-slate-900 dark:text-white"
          >{region.formatPrice(tax)}</span
        >
      </div>
    </div>

    <div
      class="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 mt-6 pt-6"
    >
      <span class="text-lg font-bold">Total</span>
      <div class="flex items-end gap-2">
        <span class="text-slate-500 dark:text-slate-400 text-sm mb-1"
          >{region.country}</span
        >
        <span class="text-3xl font-extrabold"
          >{region.formatPrice(finalTotal)}</span
        >
      </div>
    </div>
  </div>
{/snippet}

<div class="max-w-6xl mx-auto px-4 lg:px-0 py-8">
  <div class="block lg:hidden mb-10">
    <h1
      class="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight"
    >
      Checkout
    </h1>
    {@render orderSummary()}
  </div>

  <div class="flex flex-col lg:flex-row gap-12">
    <div class="w-full lg:w-3/5">
      <h1
        class="hidden lg:block text-3xl font-extrabold mb-8 text-slate-900 dark:text-white tracking-tight"
      >
        Checkout
      </h1>

      <form onsubmit={handlePlaceOrder} class="space-y-10">
        <section>
          <h2
            class="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 mb-5"
          >
            1. Contact Information
          </h2>
          <div>
            <label for="email" class={labelClass}>Email Address</label>
            <input
              id="email"
              required
              type="email"
              placeholder="you@example.com"
              class={inputClass}
            />
          </div>
        </section>

        <section>
          <h2
            class="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 mb-5"
          >
            2. Shipping Address
          </h2>
          <div class="space-y-4">
            <!-- Country Selector syncing globally -->
            <div>
              <label for="country" class={labelClass}>Country / Region</label>
              <div class="relative">
                <select
                  id="country"
                  value={region.country}
                  onchange={(e) =>
                    region.setCountry(e.currentTarget.value as CountryCode)}
                  class={inputClass}
                >
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="EU">European Union</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="fname" class={labelClass}>First Name</label>
                <input
                  id="fname"
                  required
                  type="text"
                  placeholder="John"
                  class={inputClass}
                />
              </div>
              <div>
                <label for="lname" class={labelClass}>Last Name</label>
                <input
                  id="lname"
                  required
                  type="text"
                  placeholder="Doe"
                  class={inputClass}
                />
              </div>
            </div>
            <div>
              <label for="address" class={labelClass}>Street Address</label>
              <input
                id="address"
                required
                type="text"
                placeholder="123 Main St"
                class={inputClass}
              />
            </div>
            <div>
              <label for="apt" class={labelClass}
                >Apartment, Suite, etc. <span
                  class="text-slate-400 dark:text-slate-500 font-normal"
                  >(Optional)</span
                ></label
              >
              <input
                id="apt"
                type="text"
                placeholder="Apt 4B"
                class={inputClass}
              />
            </div>

            <!-- DYNAMIC FIELDS BASED ON REGION -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label for="city" class={labelClass}>City</label>
                <input id="city" required type="text" class={inputClass} />
              </div>
              <div>
                <label for="state" class={labelClass}>
                  {stateLabel}
                  {#if !isStateRequired}<span class="text-slate-400 font-normal"
                      >(Optional)</span
                    >{/if}
                </label>
                <input
                  id="state"
                  required={isStateRequired}
                  type="text"
                  class={inputClass}
                />
              </div>
              <div>
                <label for="zip" class={labelClass}>{postalLabel}</label>
                <input id="zip" required type="text" class={inputClass} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2
            class="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 mb-5"
          >
            3. Payment Details
          </h2>
          <div
            class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <div>
              <label for="card" class={labelClass}>Card Number</label>
              <input
                id="card"
                required
                type="text"
                inputmode="numeric"
                placeholder="0000 0000 0000 0000"
                minlength="16"
                maxlength="16"
                class="{inputClass} font-mono tracking-widest"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="exp" class={labelClass}>Expiration Date</label>
                <input
                  id="exp"
                  required
                  type="text"
                  placeholder="MM/YY"
                  class={inputClass}
                />
              </div>
              <div>
                <label for="cvv" class={labelClass}>Security Code</label>
                <input
                  id="cvv"
                  required
                  type="text"
                  inputmode="numeric"
                  placeholder="123"
                  class={inputClass}
                />
              </div>
            </div>
            <div>
              <label for="name" class={labelClass}>Name on Card</label>
              <input
                id="name"
                required
                type="text"
                placeholder="JOHN DOE"
                class="{inputClass} uppercase"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isProcessing || cart.items.length === 0}
          class="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-hover active:scale-[0.98] transition-all shadow-xl shadow-primary/30 disabled:opacity-70 flex justify-center items-center gap-3 mt-4"
        >
          {#if isProcessing}
            <span class="animate-spin text-2xl leading-none">↻</span> Processing...
          {:else}
            Pay {region.formatPrice(finalTotal)}
          {/if}
        </button>
      </form>
    </div>

    <div class="hidden lg:block lg:w-2/5">
      <div class="sticky top-24">
        {@render orderSummary()}
      </div>
    </div>
  </div>
</div>
