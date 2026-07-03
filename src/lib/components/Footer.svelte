<script lang="ts">
  import { resolve } from "$app/paths";
  import { storeConfig } from "$lib/config";
</script>

<footer
  class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto transition-colors duration-300"
>
  <div class="max-w-7xl mx-auto px-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
    >
      <!-- Brand & Newsletter (Takes up 4 columns on large screens) -->
      <div class="lg:col-span-4">
        <a
          href={resolve("/")}
          class="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1 mb-4"
        >
          {storeConfig.name}<span class="text-primary">.</span>
        </a>
        <p
          class="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed"
        >
          Premium quality products, delivered right to your door. Stay up to
          date with our latest collections and exclusive offers.
        </p>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            alert("Subscribed!");
          }}
          class="flex gap-2"
        >
          <input
            required
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all text-sm"
          />
          <button
            type="submit"
            class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors text-sm shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>

      <!-- Links Grid (Takes up 8 columns) -->
      <div class="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">Shop</h3>
          <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <a
                href={resolve("/products")}
                class="hover:text-primary transition-colors">All Products</a
              >
            </li>
            <li>
              <a
                href={resolve("/products")}
                class="hover:text-primary transition-colors">Electronics</a
              >
            </li>
            <li>
              <a
                href={resolve("/products")}
                class="hover:text-primary transition-colors">Jewelry</a
              >
            </li>
            <li>
              <a
                href={resolve("/products")}
                class="hover:text-primary transition-colors">Clothing</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">Support</h3>
          <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Help Center</a
              >
            </li>
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Track Order</a
              >
            </li>
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Returns & Refunds</a
              >
            </li>
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
          <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Terms of Service</a
              >
            </li>
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#top" class="hover:text-primary transition-colors"
                >Shipping Policy</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()}
        {storeConfig.name}. All rights reserved.
      </p>
      <div class="flex gap-4 text-xl opacity-60">
        <!-- Dummy Payment Icons -->
        <span>💳</span>
        <span>📱</span>
        <span>🏦</span>
      </div>
    </div>
  </div>
</footer>
