import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, curr, index, array) => acc + Number(curr > array[index - 1]), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, current, index, array) => total + Number(array[index - 1] + current + array[index + 1] < current + array[index + 1] + array[index + 2]), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263
        `,
        expected: "7",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263
        `,
        expected: "5",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
}, 'src/day01/input.txt');
