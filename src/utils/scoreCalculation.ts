export const positive = (score, levels, output) => {
  if (0 < score && score < levels[0]) {
    return output[0];
  } else if (levels[0] <= score && score < levels[1]) {
    return output[1];
  } else {
    return output[2];
  }
}

export const negative = (score, levels, output) => {
  if (0 > score && score > levels[0]) {
    return output[0];
  } else if (levels[0] >= score && score > levels[1]) {
    return output[1];
  } else {
    return output[2];
  }
}