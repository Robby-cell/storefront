# Storefront

A fully functional, premium, client-side e-commerce storefront built with **Svelte 5**, **SvelteKit**, and **Tailwind CSS**.

Designed to mimic the polished user experience of top-tier brands (like Apple or Shopify), this project fetches real product data from the [Fake Store API](https://fakestoreapi.com/) and manages complex shopping states entirely on the client side using Svelte 5's new reactivity model (Runes).

##Features

- **Fast UI:** Data streaming and UI skeletons provide an instant, non-blocking page load.
- **Svelte 5 Runes:** Complex global state (Cart, Wishlist, Orders, History) managed purely with `$state`, `$derived`, and `$effect`—no Redux or external stores required.
- **Dynamic Localisation:** Switch between US, UK, and EU regions. The app automatically converts currencies using live exchange rates and adapts checkout form fields (e.g. "State" vs "County" vs "Province").
- **Theming Engine:** Full Dark/Light mode support with a dynamic accent colour picker (Blue, Emerald, Rose, Zinc).
- **Persistent Storage:** Cart contents, favourited items, recently viewed history, and past order receipts are securely saved in the browser's `localStorage`.
- **Responsive & Native Feel:** Mobile-optimised with swipeable horizontal carousels, numeric mobile keypads for checkout, and a slide-out cart drawer.
- **Interactive Product Details:** Mouse-tracking image magnifier and cross-selling "Related Products" carousels.
- **Production Ready:** Fully static export out-of-the-box with dynamic OpenGraph and Twitter SEO meta tags.

## Tech Stack

- **Framework:** Svelte 5 + SvelteKit
- **Styling:** Tailwind CSS v3
- **Package Manager:** Bun
- **Data Source:** Fake Store API
- **Deployment:** GitHub Pages (via `@sveltejs/adapter-static` + GitHub Actions)

## Getting Started (Local Development)

This project uses [Bun](https://bun.sh/) for lightning-fast package management and execution.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Robby-cell/storefront.git
   cd storefront
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start the development server:**

   ```bash
   bun run dev
   ```

4. **View the app:** Open `http://localhost:5173` in your browser.

## Project Architecture

The app is highly modular. Here is where the core logic lives:

- **`src/lib/state/*.svelte.ts`**: The "brains" of the app. This folder contains Svelte 5 classes handling global reactivity for the `cart`, `wishlist`, `orders`, `recent` history, `theme`, and `region` logic.
- **`src/lib/components/`**: Reusable UI elements, including the `ProductCard`, `ProductSkeleton`, and `Footer`.
- **`src/routes/`**: The file-based router.
  - `/products`: The main catalog with filtering and sorting.
  - `/product/[id]`: Dynamic product details page.
  - `/checkout`: The smart, region-aware checkout form.
  - `/account`: Order history and lifetime spend dashboard.

## Deployment (GitHub Pages)

This project is configured to deploy automatically as a static site to **GitHub Pages** using GitHub Actions and Bun.

1. Open `.github/workflows/deploy.yml`.
2. Find the `BASE_PATH` environment variable and update it to match your repository name (e.g., `'/storefront'`). _If you are deploying to a root domain like `username.github.io`, you can delete the `BASE_PATH` line._
3. Push your code to GitHub.
4. On your GitHub repository, go to **Settings** > **Pages**.
5. Under **Build and deployment**, change the Source to **GitHub Actions**.

Every time you push to the `main` branch, Bun will build the static site and deploy it globally in seconds.

## Acknowledgments

- Products and API provided by [Fake Store API](https://fakestoreapi.com/).
- Built to showcase the incredible DX of [Svelte 5](https://svelte-5-preview.vercel.app/).

## License

The project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more info.
