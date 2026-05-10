import { computed } from 'vue';
import type { Ref } from 'vue';
import type { CountryCard } from '@/types/country';

export interface PaletteResult {
  country: CountryCard;
  score: number;
  matchedOn: 'name' | 'capital' | 'subregion' | 'language';
}

function scoreCountry(
  country: CountryCard,
  query: string
): PaletteResult | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  const name = country.name.common.toLowerCase();
  const official = country.name.official.toLowerCase();
  const capital = country.capital?.[0] ?? ''.toLowerCase();
  const subregion = country.subregion ?? '';
  const languages = Object.values(country.languages ?? {}).map((l) =>
    l.toLowerCase()
  );

  if (name === q || official === q)
    return { country, score: 100, matchedOn: 'name' };
  if (name.startsWith(q) || official.startsWith(q))
    return { country, score: 80, matchedOn: 'name' };
  if (name.includes(q) || official.includes(q))
    return { country, score: 60, matchedOn: 'name' };
  if (capital === q) return { country, score: 50, matchedOn: 'capital' };
  if (capital.startsWith(q))
    return { country, score: 40, matchedOn: 'capital' };
  if (capital.includes(q)) return { country, score: 30, matchedOn: 'capital' };
  if (subregion.includes(q))
    return { country, score: 20, matchedOn: 'subregion' };
  if (languages.some((l) => l.includes(q)))
    return { country, score: 10, matchedOn: 'language' };

  return null;
}

export function usePaletteSearch(
  countries: Ref<CountryCard[]>,
  query: Ref<string>
) {
  const results = computed<PaletteResult[]>(() => {
    if (!query.value.trim()) return [];

    return countries.value
      .map((c) => scoreCountry(c, query.value))
      .filter((r): r is PaletteResult => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  });

  return { results };
}
