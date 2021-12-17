import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

// interface targetArea {
//   minX: number;
//   minY: number;
//   maxX: number;
//   maxY: number;
// };
const step = (initPosition: number[], velocity: number[]): number[][] => {
  const newPosition = [
    initPosition[0] + velocity[0],
    initPosition[1] + velocity[1],
  ];
  let dragInfluence = 0;
  if (velocity[0] > 0) {
    dragInfluence = -1;
  } else if (velocity[0] < 0) {
    dragInfluence = 1;
  }
  const newVelocity = [velocity[0] + dragInfluence, velocity[1] - 1];

  return [newPosition, newVelocity];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  let globalMaxHeight = 0;
  const [minX, maxX, minY, maxY] = input
    .replace(/target area: x=| y=/g, "")
    .split(/[^0-9-]+/g)
    .map(Number);
  for (let i = 0; i <= maxX; i++) {
    for (let j = minY; j < 100; j++) {
      let velocity = [i, j];
      let position = [0, 0];
      let maxHeight = 0;
      while (
          position[0] <= maxX &&
          position[1] >= minY
      ) {
        [position, velocity] = step(position, velocity);
        maxHeight = Math.max(maxHeight, position[1]);
        if (position[0] <= maxX && position[0] >= minX && position[1] <= maxY && position[1] >= minY) {
          globalMaxHeight = Math.max(globalMaxHeight, maxHeight);
          break;
        }
      }
      
    }
  }

  return globalMaxHeight;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;
  const [minX, maxX, minY, maxY] = input
    .replace(/target area: x=| y=/g, "")
    .split(/[^0-9-]+/g)
    .map(Number);
  for (let i = 0; i <= maxX; i++) {
    for (let j = minY; j < 1000; j++) {
      let velocity = [i, j];
      let position = [0, 0];
      while (
          position[0] <= maxX &&
          position[1] >= minY
      ) {
        [position, velocity] = step(position, velocity);
        if (position[0] <= maxX && position[0] >= minX && position[1] <= maxY && position[1] >= minY) {
          count++;
          break;
        }
      }
      
    }
  }

  return count;
};

run(
  {
    part1: {
      tests: [
        {
          input: `target area: x=20..30, y=-10..-5`,
          expected: 45,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `target area: x=20..30, y=-10..-5`,
          expected: 112,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day17/input.txt",
);
