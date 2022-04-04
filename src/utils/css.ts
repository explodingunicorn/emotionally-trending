export const getCssVar = (el, variable) => {
  return getComputedStyle(el).getPropertyValue(variable);
};
