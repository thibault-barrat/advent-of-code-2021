import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");
    return { direction, distance: Number(distance) };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [position, depth] = input.reduce(
    (acc, curr) => {
      switch (curr.direction) {
        case "forward":
          return [acc[0] + curr.distance, acc[1]];
        case "down":
          return [acc[0], acc[1] + curr.distance];
        case "up":
          return [acc[0], acc[1] - curr.distance];
        default:
          return acc;
      }
    },
    [0, 0],
  );

  return position * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [position, depth] = input.reduce<number[]>(
    (acc, curr) => {
      switch (curr.direction) {
        case "forward":
          acc = [
            acc[0] + curr.distance,
            acc[1] + curr.distance * acc[2],
            acc[2],
          ];
          return acc;
        case "down":
          acc = [acc[0], acc[1], acc[2] + curr.distance];
          return acc;
        case "up":
          acc = [acc[0], acc[1], acc[2] - curr.distance];
          return acc;
        default:
          return acc;
      }
    },
    [0, 0, 0],
  );

  return position * depth;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
          `,
          expected: 150,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
          `,
          expected: 900,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day02/input.txt",
);
