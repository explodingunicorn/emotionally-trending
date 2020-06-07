<script>
  import Card from './Card.svelte';
  import Grid from './Grid.svelte';
  import EmotionScore from './EmotionScore.svelte';
  import WordCount from './WordCount.svelte';
  export let trend;
  export let index;

  const now = Date.now();
  const diff = now - trend.createdAt;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
</script>

<style>
  p,
  a {
    font-size: 1.5rem;
    margin: 0;
  }

  a {
    padding: 0 4px;
  }

  .header {
    align-items: center;
    display: flex;
    flex-direction: row;
    max-width: 100%;
  }

  .header a {
    display: inline-block;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<Card>
  <div class="header" slot="header">
    <p>{index + 1}.</p>
    <a href="trend/{trend.id}">{trend.name}</a>

    {#if !hours && !minutes}
      <sub>New trend</sub>
    {:else}
      <sub>{hours ? `${hours}h` : ''} {minutes ? `${minutes}m` : ''}</sub>
    {/if}
  </div>
  <EmotionScore score={trend.scoreAvg} />
  <Grid template="1fr 1fr">
    <WordCount title="positive words" positive words={trend.positiveWords} />
    <WordCount title="negative words" negative words={trend.negativeWords} />
  </Grid>
</Card>
