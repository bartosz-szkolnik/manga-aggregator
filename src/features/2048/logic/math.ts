export function getTwoDifferentRandomValues(limit: number): [number, number] {
  const first = generateRandomInteger(limit);

  let second = generateRandomInteger(limit);
  while (second === first) {
    second = generateRandomInteger(limit);
  }

  return [first, second];
}

export function getIndexForEmptySpace(space: number[], limit: number) {
  let randomIndex = generateRandomInteger(limit);
  while (space[randomIndex] !== 0) {
    randomIndex = generateRandomInteger(limit);
  }

  return randomIndex;
}

function generateRandomInteger(limit: number) {
  return Math.floor(Math.random() * limit);
}
