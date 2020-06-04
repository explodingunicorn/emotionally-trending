<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    width: 100%;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
