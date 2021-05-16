<script>
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { getCssVar } from '../utils/css.js';
  export let height = '200px';
  export let data;
  export let xKey;
  export let xDataTransform = (data) => data;
  export let yKey;
  export let yDataTransform = (data) => data;
  export let title;
  let canvasEl;
  let chart;
  let labels = [];
  let yData = [];
  let colors;

  data.forEach((point) => {
    labels.push(xDataTransform(point[xKey]));
    yData.push(yDataTransform(point[yKey]));
  });

  const setColors = () => {
    if (yData[yData.length - 1] < 0) {
      colors = [
        getCssVar(canvasEl, '--red'),
        getCssVar(canvasEl, '--red-transparent'),
      ];
    } else {
      colors = [
        getCssVar(canvasEl, '--green'),
        getCssVar(canvasEl, '--green-transparent'),
      ];
    }
  };

  onMount(() => {
    setColors();
    chart = new Chart(canvasEl.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            borderColor: colors[0],
            backgroundColor: colors[1],
            label: title,
            data: yData,
          },
        ],
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
