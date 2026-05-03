import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export interface GdpDataPoint {
  year: number;
  gdp: number | null;
  gdpPerCapita: number | null;
}

export function useWorldBank(cca2: Ref<string>) {
  const gdpSeries = ref<GdpDataPoint[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchGdp(code: string) {
    if (!code) return;

    isLoading.value = true;
    error.value = null;
    gdpSeries.value = [];

    try {
      const [gdpRes, pcapRes] = await Promise.all([
        fetch(
          `https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.MKTP.CD?format=json&mrv=10&per_page=10`
        ),
        fetch(
          `https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.PCAP.CD?format=json&mrv=10&per_page=10`
        ),
      ]);

      if (!gdpRes.ok || !pcapRes.ok)
        throw new Error('World Bank API request failed');

      // data[0] is always the pagination metadata object
      const [, gdpData] = await gdpRes.json();
      const [, pcapData] = await pcapRes.json();

      const pcapByYear = new Map<number, number | null>(
        (pcapData ?? []).map((d: { date: string; value: number | null }) => [
          Number(d.date),
          d.value,
        ])
      );

      gdpSeries.value = (gdpData ?? [])
        .map((d: { date: string; value: number | null }) => ({
          year: Number(d.date),
          gdp: d.value,
          gdpPerCapita: pcapByYear.get(Number(d.date)) ?? null,
        }))
        .sort((a: GdpDataPoint, b: GdpDataPoint) => a.year - b.year);
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Failed to fetch World Bank data';
    } finally {
      isLoading.value = false;
    }
  }

  const initialFetch = fetchGdp(cca2.value);
  watch(cca2, (newCode) => fetchGdp(newCode));

  return { gdpSeries, isLoading, error, initialFetch };
}
