import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getAdjacentPositions = (grid: number[][], position: number[]) => {
  const [i, j] = position;
  const adjacents: number[][] = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
  return adjacents.filter((adjacent) => {
    return (
      adjacent[0] >= 0 &&
      adjacent[0] < grid.length &&
      adjacent[1] >= 0 &&
      adjacent[1] < grid[adjacent[0]].length &&
      grid[adjacent[0]][adjacent[1]] < 10
    );
  });
};

const increaseLevelStep = (grid: number[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] += 1;
    }
  }
};

const flashStep = (grid: number[][], position: number[], counter: number) => {
  const [i, j] = position;
  if (grid[i][j] === 10) {
    grid[i][j] += 1;
    counter++;
    const adjacents = getAdjacentPositions(grid, position);
    adjacents.forEach((adjacent) => {
      grid[adjacent[0]][adjacent[1]] = grid[adjacent[0]][adjacent[1]] + 1;
    });
    adjacents.forEach((adjacent) => {
      counter = flashStep(grid, adjacent, counter);
    });
  }
  return counter;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let octopus: number[][] = [];
  octopus = input.map((line) => line.split("").map(Number));
  let flashCount = 0;

  for (let k = 1; k <= 100; k++) {
    increaseLevelStep(octopus);
    for (let i = 0; i < octopus.length; i++) {
      for (let j = 0; j < octopus[i].length; j++) {
        flashCount = flashStep(octopus, [i, j], flashCount);
      }
    }
    for (let i = 0; i < octopus.length; i++) {
      for (let j = 0; j < octopus[i].length; j++) {
        if (octopus[i][j] > 9) {
          octopus[i][j] = 0;
        }
      }
    }
  }

  return flashCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let octopus: number[][] = [];
  octopus = input.map((line) => line.split("").map(Number));
  let flashCount = 0;
  let step = 1;
  let octopusNumber = octopus.length * octopus[0].length;
  let flashCountByStep = 0;
  while (flashCountByStep !== octopusNumber) {
    flashCountByStep = 0;
    increaseLevelStep(octopus);
    for (let i = 0; i < octopus.length; i++) {
      for (let j = 0; j < octopus[i].length; j++) {
        flashCount = flashStep(octopus, [i, j], flashCount);
      }
    }
    for (let i = 0; i < octopus.length; i++) {
      for (let j = 0; j < octopus[i].length; j++) {
        if (octopus[i][j] > 9) {
          octopus[i][j] = 0;
          flashCountByStep++;
        }
      }
    }
    step++;
  }
  return step - 1;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        5483143223
        2745854711
        5264556173
        6141336146
        6357385478
        4167524645
        2176841721
        6882881134
        4846848554
        5283751526
        `,
          expected: 1656,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        5483143223
        2745854711
        5264556173
        6141336146
        6357385478
        4167524645
        2176841721
        6882881134
        4846848554
        5283751526
        `,
          expected: 195,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day11/input.txt",
);
