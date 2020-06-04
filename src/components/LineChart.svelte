<script>
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  export let height = '200px';
  export let data;
  export let xKey;
  export let yKey;
  export let title;
  let canvasEl;
  let chart;
  let labels = [];
  let yData = [];
  let colors;

  data.forEach(point => {
    labels.push(point[xKey]);
    yData.push(point[yKey]);
  });

  const setColors = () => {
    if (yData[yData.length - 1] < 0) {
      console.log(
        getComputedStyle(canvasEl).getPropertyValue('--red-transparent')
      );
      colors = [
        getComputedStyle(canvasEl).getPropertyValue('--red'),
        getComputedStyle(canvasEl).getPropertyValue('--red-transparent'),
      ];
    } else {
      colors = [
        getComputedStyle(canvasEl).getPropertyValue('--green'),
        getComputedStyle(canvasEl).getPropertyValue('--green-transparent'),
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
