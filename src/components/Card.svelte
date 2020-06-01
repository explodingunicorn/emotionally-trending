<style>
  .card {
    background-color: white;
    border: 1px solid var(--black-transparent);
    border-radius: 2px;
    padding: 16px;
  }

  .card:hover {
    box-shadow: 0 0 0px 2px var(--blue-transparent);

    
  }

  .card-header {
    margin-bottom: 8px;
  }

  .card-header > * {
    margin: 0 !important;
  }
</style>

<div class='card'>
  <div class='card-header'>
    <slot name='header'></slot>
  </div>
  <slot></slot>
</div>