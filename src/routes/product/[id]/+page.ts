import type { PageLoad } from "./$types";
import type { Product } from "$lib/types";

export const load: PageLoad = async ({ fetch, params }) => {
  // 1. Fetch main product
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product: Product = await res.json();

  // 2. Fetch related products from the same category
  const relatedRes = await fetch(
    `https://fakestoreapi.com/products/category/${product.category}`,
  );
  const allRelated: Product[] = await relatedRes.json();

  // Filter out the current product so it doesn't show in "related", and take the first 4
  const related = allRelated.filter((p) => p.id !== product.id).slice(0, 4);

  return { product, related };
};
