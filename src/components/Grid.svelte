<script>
  export let template = '1fr 1fr 1fr';
  export let columnGap = '16px';
  export let rowGap = '16px';
</script>

<style>
  div {
    grid-auto-rows: auto;
    display: grid;
    min-height: 0;
    min-width: 0;
    width: 100%;
  }
</style>

<div
  style="grid-template-columns: {template}; column-gap: {columnGap}; row-gap: {rowGap}">
  <slot />
</div>
