<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`trends.json`)
      .then(r => {
        return r.json();
      })
      .then(data => {
        const trends = Object.keys(data).map(key => data[key]);
        return { trends };
      });
  }
</script>

<script>
  import Grid from "../components/Grid.svelte";
  import Card from "../components/Card.svelte";
  import EmotionScore from "../components/EmotionScore.svelte";
  import WordCount from "../components/WordCount.svelte";
  export let trends;

  const avg =
    trends.reduce((acc, trend) => (acc += trend.scoreAvg), 0) / trends.length;
</script>

<style>
  .hero {
    text-align: center;
    padding: 48px 0;
  }

  p {
    font-size: 1.5rem;
    margin: 0;
  }
</style>

<svelte:head>
  <title>Emotionally Trending</title>
</svelte:head>

<div class="hero">
  <h1>Twitter is currently feeling...</h1>
  <EmotionScore score={avg} size="large" />
</div>

<Grid>
  {#each trends as trend, index}
    <Card>
      <p slot="header">
        {index + 1}.
        <a href="trend/{trend.id}">{trend.name}</a>
      </p>
      <EmotionScore score={trend.scoreAvg} />
      <Grid template="1fr 1fr">
        <WordCount
          title="positive words"
          positive
          words={trend.positiveWords} />
        <WordCount
          title="negative words"
          negative
          words={trend.negativeWords} />
      </Grid>
    </Card>
  {/each}
</Grid>
