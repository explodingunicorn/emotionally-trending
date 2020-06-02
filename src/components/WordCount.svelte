<script>
  export let negative = false;
  export let positive = false;
  export let title;
  export let words;

  const max = words[0].count;
</script>

<style>
  .word-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .block-container {
    border: 1px solid var(--black-transparent);
    background-color: var(--gray);
    display: inline-block;
    margin-left: 8px;
    position: relative;
    width: 50px;
    height: 3px;
  }

  .block {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .block.negative {
    background-color: var(--red);
  }

  .block.positive {
    background-color: var(--green);
  }
</style>

<div>
  <small>{title}</small>
  {#each words as word}
    <div class="word-container">
      <span>{word.word}</span>
      <div class="block-container">
        <div
          class="block"
          class:positive
          class:negative
          style="width: {(word.count / max) * 100}%" />
      </div>
    </div>
  {/each}
</div>
