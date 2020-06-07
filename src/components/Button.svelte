<script>
  export let click = () => null;
</script>

<style>
  button {
    outline: none;
    background-color: var(--blue);
    border: none;
    border-radius: 2px;
    color: white;
    font-weight: 800;
    padding: 8px 16px;
    text-transform: uppercase;
  }

  button:hover {
    background-color: var(--blue-dark);
  }

  button:focus {
    box-shadow: 0 0 0 2px var(--blue-dark);
  }

  button:active {
    box-shadow: none;
    background-color: var(--blue-light);
  }
</style>

<button on:click={click}>
  <slot />
</button>
