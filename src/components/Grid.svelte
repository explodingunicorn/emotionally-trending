<script>
  export let template = '1fr 1fr 1fr';
  export let columnGap = '16px';
  export let rowGap = '16px';
</script>

<style>
  div {
    display: grid;
  }
</style>

<div style='grid-template-columns: {template}; column-gap: {columnGap}; row-gap: {rowGap}'>
  <slot></slot>
</div>