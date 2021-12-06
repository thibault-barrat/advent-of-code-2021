import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numberList = input[0].split(",").map(Number);
  input.shift();

  interface BoardNumber {
    number: number;
    isMarked: boolean;
  }

  const boards: BoardNumber[][][] = [];
  let board: BoardNumber[][] = [];
  input
    .filter((item) => item !== "")
    .forEach((item, index) => {
      board.push(
        item
          .split(" ")
          .filter((item) => item !== "")
          .map((item) => ({
            number: Number(item),
            isMarked: false,
          })),
      );
      if (index % 5 === 4) {
        boards.push(board);
        board = [];
      }
    });

  for (const num of numberList) {
    for (const board of boards) {
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col].number === num) {
            board[row][col].isMarked = true;
            if (board[row].every((item) => item.isMarked) || board.every((item) => item[col].isMarked)) {
              return board.reduce((acc, item) => acc + item.reduce((acc, item) => acc + (!item.isMarked ? item.number : 0), 0), 0) * num;
            }
          }
        }
      }
    }
  }

};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const numberList = input[0].split(",").map(Number);
  input.shift();

  interface BoardNumber {
    number: number;
    isMarked: boolean;
  }

  interface Board {
    rows: BoardNumber[][];
    isWin: boolean;
  }

  const boards: Board[] = [];
  let board: Board = {
    rows: [],
    isWin: false,
  };
  input
    .filter((item) => item !== "")
    .forEach((item, index) => {
      board.rows.push(
        item
          .split(" ")
          .filter((item) => item !== "")
          .map((item) => ({
            number: Number(item),
            isMarked: false,
          })),
      );
      if (index % 5 === 4) {
        boards.push(board);
        board = {
          rows: [],
          isWin: false,
        };
      }
    });

  for (const num of numberList) {
    for (const board of boards) {
      for (let row = 0; row < board.rows.length; row++) {
        for (let col = 0; col < board.rows[row].length; col++) {
          if (board.rows[row][col].number === num) {
            board.rows[row][col].isMarked = true;
            if (board.rows[row].every((item) => item.isMarked) || board.rows.every((item) => item[col].isMarked)) {
              board.isWin = true;
              if (boards.every((item) => item.isWin)) {
                return board.rows.reduce((acc, item) => acc + item.reduce((acc, item) => acc + (!item.isMarked ? item.number : 0), 0), 0) * num;
              }
            }
          }
        }
      }
    }
  }
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19

         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6

        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7
        `,
          expected: 4512,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19

         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6

        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7
        `,
          expected: 1924,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day04/input.txt",
);
