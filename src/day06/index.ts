import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lanternfish = input;
  for (let i = 1; i <= 80; i++) {
    let newLanternfish: number[] = [];
    lanternfish = lanternfish.map((days) => {
      if (days > 0) {
        return days - 1;
      } else {
        newLanternfish.push(8);
        return 6;
      }
    });
    lanternfish = lanternfish.concat(newLanternfish);
  }
  return lanternfish.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const counter: number[] = Array(9).fill(0);
  for (const fish of input) {
    counter[fish]++;
  }
  for (let i = 1; i <= 256; i++) {
    const newFish = counter[0];
    for (let j = 0; j < 9; j++) {
      if (j === 8) {
        counter[j] = newFish;
      } else if (j === 6) {
        counter[j] = counter[j + 1] + newFish;
      } else {
        counter[j] = counter[j + 1];
      }
    }
  }
  return counter.reduce((a, b) => a + b);
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        3,4,3,1,2
        `,
          expected: 5934,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        3,4,3,1,2
        `,
          expected: 26984457539,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day06/input.txt",
);
