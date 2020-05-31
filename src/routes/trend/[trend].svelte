<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`trend/${params.trend}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { trend: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Card from '../../components/Card.svelte';
  export let trend;
</script>

<svelte:head>
  <title>Emotions of {trend.name}</title>
</svelte:head>

<Card>
  <h1>{trend.name}</h1>
  <h2>{trend.scoreAvg}</h2>
</Card>