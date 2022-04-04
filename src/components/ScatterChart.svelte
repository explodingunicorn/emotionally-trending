<script>
	import Chart from 'chart.js/auto/auto.js';
	import { onMount } from 'svelte';
	import { getCssVar } from '../utils/css';
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
					Positive: [...acc.Positive, { x: point[xKey], y: point[yKey], label: point[labelKey] }]
				};
			}
			return {
				...acc,
				Negative: [...acc.Negative, { x: point[xKey], y: point[yKey], label: point[labelKey] }]
			};
		},
		{ Positive: [], Negative: [] }
	);

	onMount(() => {
		chart = new Chart(canvasEl.getContext('2d'), {
			type: 'scatter',
			options: {
				plugins: {
					tooltip: {
						callbacks: {
							title: ([context]) => {
								const { dataIndex, dataset } = context;
								const { label } = dataset.data[dataIndex];
								return label;
							},
							label: (context) => {
								const { dataIndex, dataset } = context;
								const { x, y } = dataset.data[dataIndex];
								return `Sentiment: ${y}, Volume: ${x}`;
							}
						}
					}
				}
			},
			data: {
				datasets: Object.keys(transformedDataSets).map((key) => {
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
						data: transformedDataSets[key]
					};
				})
			}
		});
	});
</script>

<canvas bind:this={canvasEl} {height} />

<style>
	canvas {
		width: 100%;
	}
</style>
