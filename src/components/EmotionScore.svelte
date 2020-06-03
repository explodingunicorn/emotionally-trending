<script>
  import { positive, negative } from '../utils/scoreCalculation.js';
  export let score = 0;
  export let size = 'small';
  let selectedScore;

  let element;
  // const baseGreen = getComputedStyle(element).getPropertyValue('--green');
  // const baseRed = getComputedStyle(element).getPropertyValue('--red');
  const greens = [
    { color: '#14F6AA', value: 'slightly positive' },
    { color: '#11D45C', value: 'positive' },
    { color: '#1EEB33', value: 'very positive' },
  ];
  const reds = [
    { color: '#F5832F', value: 'slightly negative' },
    { color: '#FF6A30', value: 'negative' },
    { color: '#E94F37', value: 'very negative' },
  ];

  if (score > 0) {
    selectedScore = positive(score, [1, 3], greens);
  }

  if (score < 0) {
    selectedScore = negative(score, [-1, -3], reds);
  }
</script>

<style>
  div {
    background-color: var(--color);
    color: white;
    display: inline-flex;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-transform: uppercase;
  }

  div.small {
    font-size: 12px;
    font-weight: 600;
    line-height: 12px;
    padding: 4px;
  }

  div.large {
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    padding: 8px;
  }
</style>

<div
  bind:this={element}
  style="--color: {selectedScore ? selectedScore.color : 'var(--black)'}"
  class:small={size === 'small'}
  class:large={size === 'large'}>
  {selectedScore ? selectedScore.value : 'neutral'}
</div>
