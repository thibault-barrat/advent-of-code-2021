import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const drawPattern = (coordinates: number[][]): string[][] => {
  const pattern: string[][] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (!pattern[y]) {
      pattern[y] = [];
    }
    pattern[y][x] = "#";
  }
  return pattern;
};

const countDots = (pattern: string[][]) => {
  let count = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (!pattern[i]) {
      continue;
    }
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === "#") {
        count++;
      }
    }
  }
  return count;
};

const foldPaper = (pattern: string[][], instruction: string[]) => {
  const direction = instruction[0];
  const amount = Number(instruction[1]);
  if (direction === "y") {
    const bottom = pattern.slice(amount + 1);
    pattern = pattern.slice(0, amount);
    for (let i = 0; i < bottom.length; i++) {
      if (bottom[i]) {
        const y = pattern.length - 1 - i;
        if (y >= 0) {
          if (!pattern[y]) {
            pattern[y] = [];
          }
          for (let j = 0; j < bottom[i].length; j++) {
            if (bottom[i][j]) {
              pattern[y][j] = bottom[i][j];
            }
          }
        }
      }
    }
  }
  if (direction === "x") {
    const right = pattern.map((line) => line.slice(amount + 1));
    pattern = pattern.map((line) => line.slice(0, amount));
    for (let i = 0; i < right.length; i++) {
      if (right[i]) {
        for (let j = 0; j < right[i].length; j++) {
          const x = pattern[i].length - 1 - j;
          if (x >= 0) {
            if (right[i][j]) {
              pattern[i][x] = right[i][j];
            }
          }
        }
      }
    }
  }
  return pattern;
};

const logPattern = (pattern: string[][]) => {
  const loggedPattern = pattern;
  for (let i = 0; i < loggedPattern.length; i++) {
    if (!loggedPattern[i]) {
      loggedPattern[i] = [];
    }
    for (let j = 0; j < loggedPattern[i].length; j++) {
      if (!loggedPattern[i][j]) {
        loggedPattern[i][j] = ".";
      }
    }
  }
  loggedPattern.forEach((line) => console.log(line.join("")));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const emptyIndex = input.indexOf("");
  const coordinates: number[][] = input
    .slice(0, emptyIndex)
    .map((line) => line.split(",").map(Number));
  const instructions = input
    .slice(emptyIndex + 1)
    .map((line) => line.replace("fold along ", "").split("="));

  let pattern = drawPattern(coordinates);
  for (let i = 0; i < instructions.length; i++) {
    pattern = foldPaper(pattern, instructions[i]);
  }
  logPattern(pattern);
  return countDots(pattern);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        6,10
        0,14
        9,10
        0,3
        10,4
        4,11
        6,0
        6,12
        4,1
        0,13
        10,12
        3,4
        3,0
        8,4
        1,10
        2,14
        8,10
        9,0

        fold along y=7
        fold along x=5
        `,
          expected: 17,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        // {
        //   input: ``,
        //   expected: "",
        // },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day13/input.txt",
);
