<script>
  export let direction = 'row';
  export let alignItems = 'start';
  export let justifyContent = 'start';
</script>

<style>
  div {
    display: flex;
  }

  .direction-row {
    flex-direction: row;
  }

  .direction-column {
    flex-direction: column;
  }

  .align-center {
    align-items: center;
  }

  .align-start {
    align-items: flex-start;
  }

  .align-end {
    align-items: flex-end;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-start {
    justify-content: start;
  }

  .justify-end {
    justify-content: end;
  }
</style>

<div class="direction-{direction} align-{alignItems} justify-{justifyContent}">
  <slot />
</div>
