<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`trends.json`).then(r => { 
      return r.json() 
    }).then(data => {
			const trends = Object.keys(data).map(key => data[key]) ;
			return { trends };
		});
	}
</script>

<script>
	export let trends;
</script>

<style>
	a {
    display: block;
  }
</style>

<svelte:head>
	<title>Emotionally Trending</title>
</svelte:head>

<div>
  {#each trends as trend}
    <a href='trend/{trend.id}'>{trend.name}</a>
  {/each}
</div>
