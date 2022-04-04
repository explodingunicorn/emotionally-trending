<script>
	import Chart from 'chart.js/auto/auto.js';
	import { onMount } from 'svelte';
	import { getCssVar } from '../utils/css';
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
			colors = [getCssVar(canvasEl, '--red'), getCssVar(canvasEl, '--red-transparent')];
		} else {
			colors = [getCssVar(canvasEl, '--green'), getCssVar(canvasEl, '--green-transparent')];
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
						fill: true
					}
				]
			},
			options: {
				scales: {
					y: {
						ticks: {
							callback: function (value) {
								return parseFloat(`${value}`).toFixed(2);
							}
						}
					},
					x: {
						ticks: {
							// For a category axis, the val is the index so the lookup via getLabelForValue is needed
							callback: function (val, index) {
								// Hide the label of every 2nd dataset
								return index % 10 === 0 ? labels[val] : '';
							}
						}
					}
				}
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
