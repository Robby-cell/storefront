import { browser } from "$app/environment";

export type CountryCode = "US" | "GB" | "EU";

// Treating the API's default prices as USD base
export const exchangeRates: Record<CountryCode, number> = {
  US: 1.0,
  GB: 0.79, // $1 = £0.79
  EU: 0.92, // $1 = €0.92
};

export const regionSettings = {
  US: { currency: "USD", locale: "en-US" },
  GB: { currency: "GBP", locale: "en-GB" },
  EU: { currency: "EUR", locale: "en-IE" }, // Using Ireland for English+Euro formatting
} as const;

class RegionState {
  country = $state<CountryCode>("GB"); // Defaults to UK 🇬🇧

  constructor() {
    if (browser) {
      const saved = localStorage.getItem("region");
      if (saved && (saved === "US" || saved === "GB" || saved === "EU")) {
        this.country = saved;
      }
    }
  }

  setCountry(c: CountryCode) {
    this.country = c;
    if (browser) {
      localStorage.setItem("region", c);
    }
  }

  // This completely replaces .toFixed(2) and raw $ strings!
  formatPrice(baseUsdPrice: number) {
    const rate = exchangeRates[this.country];
    const converted = baseUsdPrice * rate;
    const settings = regionSettings[this.country];

    return new Intl.NumberFormat(settings.locale, {
      style: "currency",
      currency: settings.currency,
    }).format(converted);
  }
}

export const region = new RegionState();
