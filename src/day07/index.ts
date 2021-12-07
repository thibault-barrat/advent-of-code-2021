import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sortedPositions = input.sort((a, b) => a - b);
  const middle = Math.floor(sortedPositions.length / 2);
  const median = sortedPositions[middle];
  
  return sortedPositions.reduce((acc, curr) => acc + Math.abs(median - curr), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const average = Math.floor(input.reduce((acc, curr) => acc + curr, 0) / input.length);

  return input.reduce((acc, curr) => {
    const diff = Math.abs(average - curr);
    let cost = 0;
    for (let i = 1; i <= diff; i++) {
      cost += i;
    }
    return acc + cost;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
}, "src/day07/input.txt");
