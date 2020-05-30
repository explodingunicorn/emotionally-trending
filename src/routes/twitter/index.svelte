<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`twitter/trending.json`).then(r => { 
      return r.json() 
    }).then(data => {
			return { trends: data[0].trends };
		});
	}
</script>

<script>
  export let trends;
  console.log(trends);
</script>

<style>
  a {
    display: block;
  }
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<div>
  {#each trends as trend}
    <a href='{trend.url}' target='_blank'>{trend.name}</a>
  {/each}
</div>