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
  import Card from '../../components/Card.svelte';
  import Grid from '../../components/Grid.svelte';
  import EmotionScore from '../../components/EmotionScore.svelte';
  export let trend;

  const tweetGroups = [trend.positiveTweets, trend.negativeTweets];
</script>

<style>
  h2 {
    margin-bottom: 0;
    line-height: 1.5em;
  }
</style>

<svelte:head>
  <title>Emotions of {trend.name}</title>
</svelte:head>

<div>
  <h1>{trend.name}</h1>
  <EmotionScore score={trend.scoreAvg} size='large' />
</div>

<Grid template='1fr 1fr'>
  {#each tweetGroups as tweets, index}
    <div>
      <h2>Most {index ? 'Negative' : 'Positive'} Tweets</h2>
      <Grid template='1fr'>
        {#each tweets as tweet}
          <Card>
            <p slot='header'>
              <a 
                href='https://www.twitter.com/{tweet.user.screenName}' 
                target='_blank'
              >
                @{tweet.user.name}
              </a>
            </p>
            <p>{@html tweet.text}</p>
            <EmotionScore score={tweet.sentiment.score} />
          </Card>
        {/each}
      </Grid>
    </div>
  {/each}
</Grid>