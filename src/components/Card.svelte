<style>
  .card {
    background-color: white;
    border: 1px solid var(--black-transparent);
    display: grid;
    border-radius: 2px;
    padding: 16px;
    grid-template-columns: auto;
    grid-gap: 8px;
    justify-items: start;
  }

  .card:hover {
    box-shadow: 0 0 0px 2px var(--blue-transparent);
  }

  .card-header {
    width: 100%;
  }

  .card-header > :global(*) {
    margin-bottom: 0;
    margin-top: 0;
  }
</style>

<div class="card">
  <div class="card-header">
    <slot name="header" />
  </div>
  <slot />
</div>
