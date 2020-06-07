<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`trend/${params.trend}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { trend: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import MainContainer from '../../components/MainContainer.svelte';
  import Card from '../../components/Card.svelte';
  import Grid from '../../components/Grid.svelte';
  import EmotionScore from '../../components/EmotionScore.svelte';
  import Tweet from '../../components/Tweet.svelte';
  import LineChart from '../../components/LineChart.svelte';
  export let trend;

  const tweetGroups = [trend.positiveTweets, trend.negativeTweets];
  const alteredData = trend.scoreAvgHistory.map(score => {
    return {
      scoreAvg: score.scoreAvg,
      time: new Date(score.time).toLocaleTimeString(),
    };
  });
</script>

<style>
  h2 {
    margin-bottom: 16px;
    line-height: 1.5em;
  }

  .header-container {
    background-color: white;
    border-bottom: 1px solid var(--black-transparent);
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .header {
    align-items: center;
    display: flex;
    max-width: 70%;
    margin: 0 auto;
    padding: 16px 0;
  }

  h1 {
    margin-bottom: 0;
    margin-left: 16px;
  }

  .main {
    padding-top: 16px;
  }
</style>

<svelte:head>
  <title>Emotions of {trend.name}</title>
</svelte:head>

<div class="header-container">
  <div class="header">
    <EmotionScore score={trend.scoreAvg} size="large" />
    <h1>{trend.name}</h1>
  </div>
</div>

<MainContainer>
  <div class="main">
    <Grid template="auto" columnGap="24px">
      <Card>
        <LineChart
          data={alteredData}
          height="300px"
          xKey="time"
          yKey="scoreAvg"
          title="Average sentiment over time" />
      </Card>

      <Grid template="1fr 1fr">
        {#each tweetGroups as tweets, index}
          <div>
            <h2>Most {index ? 'Negative' : 'Positive'} Tweets</h2>
            <Grid template="1fr">
              {#each tweets as tweet}
                <Card>
                  <p slot="header">
                    <a
                      href="https://www.twitter.com/{tweet.user.screenName}"
                      target="_blank">
                      @{tweet.user.name}
                    </a>
                  </p>
                  <Tweet {tweet} />
                  <EmotionScore score={tweet.sentiment.score} />
                </Card>
              {/each}
            </Grid>
          </div>
        {/each}
      </Grid>
    </Grid>
  </div>
</MainContainer>
