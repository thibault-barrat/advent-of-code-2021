import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const riskGrid: number[][] = input.map((line) => line.split("").map(Number));

  const getPreviousPositionsRisk = (pos: number[]) => {
    const previousPositionsRisk: number[] = [];
    if (pos[0] > 0) {
      previousPositionsRisk.push(riskGrid[pos[0] - 1][pos[1]]);
    }
    if (pos[1] > 0) {
      previousPositionsRisk.push(riskGrid[pos[0]][pos[1] - 1]);
    }
    return previousPositionsRisk;
  };

  for (let i = 0; i < riskGrid.length; i++) {
    for (let j = 0; j < riskGrid[i].length; j++) {
      if (i > 1 || j > 1) {
        const previousPositionsRisk = getPreviousPositionsRisk([i, j]);
        riskGrid[i][j] += Math.min(...previousPositionsRisk);
      }
    }
  }

  return riskGrid[riskGrid.length - 1][riskGrid[0].length - 1];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const riskGrid: number[][] = input.map((line) => line.split("").map(Number));
  const fullRiskGrid: number[][] = [];

  for (let i = 0; i < riskGrid.length * 5; i++) {
    fullRiskGrid[i] = [];
    for (let j = 0; j < riskGrid[0].length * 5; j++) {
      if (i < riskGrid.length && j < riskGrid[0].length) {
        fullRiskGrid[i][j] = riskGrid[i][j];
      } else if (i < riskGrid.length) {
        fullRiskGrid[i][j] =
          fullRiskGrid[i][j - riskGrid[0].length] < 9
            ? fullRiskGrid[i][j - riskGrid[0].length] + 1
            : 1;
      } else {
        fullRiskGrid[i][j] =
          fullRiskGrid[i - riskGrid.length][j] < 9
            ? fullRiskGrid[i - riskGrid.length][j] + 1
            : 1;
      }
    }
  }

  const getPreviousPositions = (pos: number[]) => {
    const previousPositions: number[][] = [];
    if (pos[0] > 0) {
      previousPositions.push([pos[0] - 1, pos[1]]);
    }
    if (pos[1] > 0) {
      previousPositions.push([pos[0], pos[1] - 1]);
    }
    if (pos[0] < fullRiskGrid.length - 1) {
      previousPositions.push([pos[0] + 1, pos[1]]);
    }
    if (pos[1] < fullRiskGrid[0].length - 1) {
      previousPositions.push([pos[0], pos[1] + 1]);
    }
    return previousPositions;
  };

  fullRiskGrid[0][0] = 0;
  const scoreBoard: number[][] = fullRiskGrid.map((row) =>
    row.map((cell) => Infinity),
  );
  scoreBoard[0][0] = 0;

  let prevBoard: number[][] = [];
  while (JSON.stringify(scoreBoard) !== JSON.stringify(prevBoard)) {
    prevBoard = scoreBoard.map((row) => [...row]);
    for (let i = 0; i < fullRiskGrid.length; i++) {
      for (let j = 0; j < fullRiskGrid[i].length; j++) {
        if (i === 0 && j === 0) continue;
        const previousPositions = getPreviousPositions([i, j]);
        scoreBoard[i][j] = Math.min(
          ...previousPositions.map((pos) => scoreBoard[pos[0]][pos[1]]),
        ) + fullRiskGrid[i][j];
      }
    }
  }
  return scoreBoard[scoreBoard.length - 1][scoreBoard[0].length - 1];
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581
        `,
          expected: 40,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581
        `,
          expected: 315,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day15/input.txt",
);
