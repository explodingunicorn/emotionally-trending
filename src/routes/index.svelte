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
  import Button from '../components/Button.svelte';
  import Flex from '../components/Flex.svelte';
  import ScatterChart from '../components/ScatterChart.svelte';
  import Card from '../components/Card.svelte';

  export let trends;

  let filteredTrends = trends.filter(trend => trend.tweetVolume);
  let baseArrSize = 9;
  let baseArr = new Array(baseArrSize);

  const onShowMore = () => {
    baseArrSize += 9;
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

  .graphs {
    background-color: white;
    padding-top: 32px;
  }
</style>

<svelte:head>
  <title>Emotionally Trending</title>
</svelte:head>

<MainContainer>
  <Grid template="100%" rowGap="16px" columnGap="0px">
    <div class="hero">
      <h1>Twitter is currently feeling...</h1>
      <EmotionScore score={avg} size="large" />
    </div>

    <Grid>
      {#each baseArr as _, index}
        <TrendCard trend={trends[index]} {index} />
      {/each}
    </Grid>

    <Flex justifyContent="center">
      <Button click={onShowMore}>Show more</Button>
    </Flex>
  </Grid>
</MainContainer>

<div class="graphs">
  <MainContainer>
    <h2>Average sentiment vs. Tweet volume</h2>
    <Card>
      <ScatterChart
        data={filteredTrends}
        xKey="tweetVolume"
        yKey="scoreAvg"
        height="400px" />
    </Card>
  </MainContainer>
</div>
