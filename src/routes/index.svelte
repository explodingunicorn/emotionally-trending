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
  import MainContainer from '../components/MainContainer.svelte';
  import Grid from '../components/Grid.svelte';
  import EmotionScore from '../components/EmotionScore.svelte';
  import TrendCard from '../components/TrendCard.svelte';
  export let trends;

  let baseArrSize = 9;
  let baseArr = new Array(baseArrSize);

  const onShowMore = () => {
    baseArrSize++;
    baseArr = new Array(baseArrSize);
  };

  const avg =
    trends.reduce((acc, trend) => (acc += trend.scoreAvg), 0) / trends.length;
</script>

<style>
  .hero {
    text-align: center;
    padding: 48px 0;
  }
</style>

<svelte:head>
  <title>Emotionally Trending</title>
</svelte:head>

<MainContainer>
  <div class="hero">
    <h1>Twitter is currently feeling...</h1>
    <EmotionScore score={avg} size="large" />
  </div>

  <Grid>
    {#each baseArr as _, index}
      <TrendCard trend={trends[index]} {index} />
    {/each}
  </Grid>
</MainContainer>
