<script>
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { getCssVar } from '../utils/css.js';
  export let height = '200px';
  export let data;
  export let xKey;
  export let yKey;
  export let labelKey = 'name';

  let canvasEl;
  let chart;
  let transformedDataSets = data.reduce(
    (acc, point) => {
      if (point.scoreAvg > 0) {
        return {
          ...acc,
          Positive: [
            ...acc.Positive,
            { x: point[xKey], y: point[yKey], label: point[labelKey] },
          ],
        };
      }
      return {
        ...acc,
        Negative: [
          ...acc.Negative,
          { x: point[xKey], y: point[yKey], label: point[labelKey] },
        ],
      };
    },
    { Positive: [], Negative: [] }
  );

  onMount(() => {
    chart = new Chart(canvasEl.getContext('2d'), {
      type: 'scatter',
      options: {
        tooltips: {
          callbacks: {
            title: (item, data) => {
              console.log(item, data);
              const { datasetIndex, index } = item[0];
              const { label } = data.datasets[datasetIndex].data[index];
              return label;
            },
            label: (item, data) => {
              const { datasetIndex, index } = item;
              const { x, y } = data.datasets[datasetIndex].data[index];
              return `Sentiment: ${y}, Volume: ${x}`;
            },
          },
        },
      },
      data: {
        datasets: Object.keys(transformedDataSets).map(key => {
          const backgroundColor =
            key === 'Positive'
              ? getCssVar(canvasEl, '--green-transparent')
              : getCssVar(canvasEl, '--red-transparent');
          return {
            borderWidth: 0,
            backgroundColor,
            label: `${key} sentiment`,
            pointRadius: 10,
            pointHoverRadius: 5,
            hoverBackgroundColor: backgroundColor,
            data: transformedDataSets[key],
          };
        }),
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
