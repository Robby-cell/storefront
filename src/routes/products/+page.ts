import type { PageLoad } from "./$types";
import type { Product } from "$lib/types";

export const load: PageLoad = async ({ fetch }) => {
  // We wrap the fetch in a function and return the un-awaited Promise.
  // This tells SvelteKit to load the page instantly and stream the data in the background.
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  };

  return {
    streamed: {
      products: fetchProducts(),
    },
  };
};
