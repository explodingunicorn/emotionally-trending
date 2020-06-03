<script>
  export let tweet;

  const replaceWords = (text, words, type) => {
    let newText = text;
    words.forEach(word => {
      newText = newText.replace(
        new RegExp(`\\s${word}(?=[\\s?.,!@#])`, 'gi'),
        ` <span class='${type}'>$&</span>`
      );
    });
    return newText;
  };

  let text = tweet.text;
  text = replaceWords(text, tweet.sentiment.negative, 'negative');
  text = replaceWords(text, tweet.sentiment.positive, 'positive');
</script>

<style>
  p {
    margin: 0;
  }

  p :global(span.negative) {
    color: var(--red);
    font-weight: 600;
  }

  p :global(span.positive) {
    color: var(--green);
    font-weight: 600;
  }
</style>

<p>
  {@html text}
</p>
