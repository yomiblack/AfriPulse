<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount, computed } from 'vue';
import {
  Chart,
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import type { GdpDataPoint } from '@/composables/useWorldBank';

Chart.register(
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps<{
  series: GdpDataPoint[];
  countryName: string;
}>();

const canvas = ref<HTMLCanvasElement>();

let chartInstance: Chart | null = null;

function formatGdpLabel(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${value / 1e6}M`;
  return `$${value.toFixed(0)}`;
}

function buildChart() {
  if (!canvas.value || props.series.length === 0) return;

  chartInstance?.destroy();

  const labels = props.series.map((d) => String(d.year));
  const gdpValues = props.series.map((d) => d.gdp);

  const style = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.classList.contains('dark');

  const gridColor = isDark ? 'rgb(255,255,255,0)' : 'rgb(0,0,0,0.06)';
  const labelColor = isDark ? '#9ca3af' : '#6b7280';
  const lineColor = '#df6d18';

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.parsed.y !== null
              ? `GDP: ${formatGdpLabel(ctx.parsed.y)}`
              : 'GDP: N/A',
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: labelColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: labelColor,
          font: { size: 11 },
          callback: (val) => formatGdpLabel(Number(val)),
        },
      },
    },
  };

  chartInstance = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: gdpValues,
          borderColor: lineColor,
          backgroundColor: `${lineColor}20`,
          borderWidth: 2,
          pointHoverRadius: 6,
          tension: 0.35,
          fill: true,
        },
      ],
    },
    options,
  });
}

onMounted(() => {
  buildChart();
});

onBeforeMount(() => {
  chartInstance?.destroy();
});

watch(() => props.series, buildChart, { deep: true });
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 chadow-sm p-6"
  >
    <div class="flex items-center justify-between mb-4">
      <h3
        class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest"
      >
        GDP - 10-year trend
      </h3>
      <span class="text-xs text-gray-400 dark:text-gray-500"
        >Source: World Bank</span
      >
    </div>
    <div class="h-56">
      <canvas ref="canvas" />
    </div>
  </div>
</template>
