<script>
  export let negative;
  export let positive;
  export let count = 0;
</script>

<style>
  .block {
    display: inline-block;
    height: 5px;
    margin-right: 0.5px;
    width: 2px;
  }

  .block.negative {
    background-color: var(--red);
  }

  .block.positive {
    background-color: var(--green);
  }
</style>

<div>
  <slot />
  {#each Array(count) as index}
    <div class="block" class:positive class:negative />
  {/each}
</div>
