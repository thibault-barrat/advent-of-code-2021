import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const findAdjacents = (map: number[][], point: number[]) => {
  const i = point[0];
  const j = point[1];
  const adjacents: number[][] = [];
  if (i > 0) {
    adjacents.push([i - 1, j]);
  }
  if (j > 0) {
    adjacents.push([i, j - 1]);
  }
  if (i < map.length - 1) {
    adjacents.push([i + 1, j]);
  }
  if (j < map[i].length - 1) {
    adjacents.push([i, j + 1]);
  }
  return adjacents;
};

const detectLowPoints = (
  map: number[][],
  point: number[],
  adjacents: number[][],
) => {
  return adjacents.reduce(
    (isLowPoint, adjacent) =>
      isLowPoint && map[adjacent[0]][adjacent[1]] > map[point[0]][point[1]],
    true,
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const heightMap = input.map((line) => line.split("").map(Number));
  const lowPoints: number[] = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const adjacents = findAdjacents(heightMap, [i, j]);
      if (detectLowPoints(heightMap, [i, j], adjacents)) {
        lowPoints.push(heightMap[i][j]);
      }
    }
  }

  return lowPoints.reduce((sum, point) => sum + point + 1, 0);
};

const recursiveFindBasinPositions = (
  basinPointsPosition: number[][],
  map: number[][],
  point: number[],
) => {
  const adjacents = findAdjacents(map, point);

  adjacents.forEach((adjacent) => {
    if (
      map[adjacent[0]][adjacent[1]] !== 9 &&
      !basinPointsPosition.some(
        (basinPoint) =>
          basinPoint[0] === adjacent[0] && basinPoint[1] === adjacent[1],
      )
    ) {
      basinPointsPosition.push(adjacent);
      recursiveFindBasinPositions(basinPointsPosition, map, adjacent);
    }
  });
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const heightMap = input.map((line) => line.split("").map(Number));
  const lowPointsPosition: number[][] = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const adjacents = findAdjacents(heightMap, [i, j]);
      if (detectLowPoints(heightMap, [i, j], adjacents)) {
        lowPointsPosition.push([i, j]);
      }
    }
  }
  const basinSizeList: number[] = [];
  lowPointsPosition.forEach((point) => {
    const basinPointsPosition: number[][] = [point];
    recursiveFindBasinPositions(basinPointsPosition, heightMap, point);
    basinSizeList.push(basinPointsPosition.length);
  });
  return basinSizeList.sort((a, b) => b - a).slice(0, 3).reduce((multi, size) => multi * size);
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        2199943210
        3987894921
        9856789892
        8767896789
        9899965678
        `,
          expected: 15,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        2199943210
        3987894921
        9856789892
        8767896789
        9899965678
        `,
          expected: 1134,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day09/input.txt",
);
