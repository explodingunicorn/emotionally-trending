<script>
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { getCssVar } from '../utils/css.js';
  export let data;
  export let xKey;
  export let yKey;
  export let height;
  export let title;
  export let backgroundColor;

  let canvasEl;
  let chart;
  let colors = {};
  const transformedData = data.map(point => {
    return point[yKey];
  });
  const labels = data.map(point => point[xKey]);

  const setColors = () => {
    colors = {
      red: getCssVar(canvasEl, '--red-transparent'),
      green: getCssVar(canvasEl, '--green-transparent'),
      hover: {
        red: getCssVar(canvasEl, '--red'),
        green: getCssVar(canvasEl, '--green'),
      },
    };
  };

  onMount(() => {
    setColors();
    chart = new Chart(canvasEl.getContext('2d'), {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [
          {
            label: title,
            backgroundColor: colors[backgroundColor],
            hoverBackgroundColor: colors.hover[backgroundColor],
            data: transformedData,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              offset: true,
            },
          ],
        },
      },
    });
  });
</script>

<style>
  canvas {
    width: 100%;
  }
</style>

<canvas bind:this={canvasEl} {height} />
