

/**
 * Compute possible combination depending on the array and the size of the combination
 * @param array The list of element to pick
 * @param size number of element to pick
 */
export const getCombinations = <T>(array: T[], size: number): T[][] => {
  // There is no way to take e.g. arrays of 5 elements from
  // a array of 4.
  if (size > array.length || size <= 0) {
    return [];
  }

  // K-sized array has only one K-sized subarray.
  if (size === array.length) {
    return [array];
  }

  // There is N 1-sized subarrays in a N-sized array.
  if (size === 1) {
    return array.map(element => [element]);
  }

  const combs: T[][] = [];
  for (let i = 0; i < array.length - size + 1; i++) {
    // head is a list that includes only our current element.
    const head = array.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    const tailcombs = getCombinations(array.slice(i + 1), size - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the array of k-combinations.
    for (const tail of tailcombs) {
      combs.push(head.concat(tail));
    }
  }
  return combs;
};