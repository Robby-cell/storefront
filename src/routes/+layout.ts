// This tells SvelteKit to crawl the site and generate static HTML for every link it finds
export const prerender = true;

// This ensures our dynamic regions, cart, and dark mode hydrate quickly on the client
export const ssr = false;
