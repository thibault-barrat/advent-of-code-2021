import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const segmentArray = input.map((line) => {
    const [x1, y1, x2, y2] = line.split(/[\s->\s,]+/).map(Number);
    return { x1, y1, x2, y2 };
  });
  const segmentHorizontVerticalArray = segmentArray.filter((segment) => {
    return segment.x1 === segment.x2 || segment.y1 === segment.y2;
  });
  let diagram: number[][] = [];
  for (const segment of segmentHorizontVerticalArray) {
    if (segment.x1 === segment.x2) {
      if (segment.y1 > segment.y2) {
        for (let i = segment.y1; i >= segment.y2; i--) {
          if (!diagram[i]) {
            diagram[i] = [];
          }
          diagram[i][segment.x1]
            ? (diagram[i][segment.x1] += 1)
            : (diagram[i][segment.x1] = 1);
        }
      } else {
        for (let i = segment.y1; i <= segment.y2; i++) {
          if (!diagram[i]) {
            diagram[i] = [];
          }
          diagram[i][segment.x1]
            ? (diagram[i][segment.x1] += 1)
            : (diagram[i][segment.x1] = 1);
        }
      }
    } else {
      if (segment.x1 > segment.x2) {
        for (let i = segment.x1; i >= segment.x2; i--) {
          if (!diagram[segment.y1]) {
            diagram[segment.y1] = [];
          }
          diagram[segment.y1][i]
            ? (diagram[segment.y1][i] += 1)
            : (diagram[segment.y1][i] = 1);
        }
      } else {
        for (let i = segment.x1; i <= segment.x2; i++) {
          if (!diagram[segment.y1]) {
            diagram[segment.y1] = [];
          }
          diagram[segment.y1][i]
            ? (diagram[segment.y1][i] += 1)
            : (diagram[segment.y1][i] = 1);
        }
      }
    }
  }

  let count = 0;
  for (const row of diagram) {
    if (row) {
      for (const cell of row) {
        if (cell > 1) {
          count++;
        }
      }
    }
  }
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const segmentArray = input.map((line) => {
    const [x1, y1, x2, y2] = line.split(/[\s->\s,]+/).map(Number);
    return { x1, y1, x2, y2 };
  });

  let diagram: number[][] = [];
  for (const segment of segmentArray) {
    if (segment.x1 === segment.x2) {
      if (segment.y1 > segment.y2) {
        for (let i = segment.y1; i >= segment.y2; i--) {
          if (!diagram[i]) {
            diagram[i] = [];
          }
          diagram[i][segment.x1]
            ? (diagram[i][segment.x1] += 1)
            : (diagram[i][segment.x1] = 1);
        }
      } else {
        for (let i = segment.y1; i <= segment.y2; i++) {
          if (!diagram[i]) {
            diagram[i] = [];
          }
          diagram[i][segment.x1]
            ? (diagram[i][segment.x1] += 1)
            : (diagram[i][segment.x1] = 1);
        }
      }
    } else if (segment.y1 === segment.y2) {
      if (segment.x1 > segment.x2) {
        for (let i = segment.x1; i >= segment.x2; i--) {
          if (!diagram[segment.y1]) {
            diagram[segment.y1] = [];
          }
          diagram[segment.y1][i]
            ? (diagram[segment.y1][i] += 1)
            : (diagram[segment.y1][i] = 1);
        }
      } else {
        for (let i = segment.x1; i <= segment.x2; i++) {
          if (!diagram[segment.y1]) {
            diagram[segment.y1] = [];
          }
          diagram[segment.y1][i]
            ? (diagram[segment.y1][i] += 1)
            : (diagram[segment.y1][i] = 1);
        }
      }
    } else if (segment.x1 > segment.x2) {
      for (let i = segment.x1; i >= segment.x2;) {
        if (segment.y1 > segment.y2) {
          for (let j = segment.y1; j >= segment.y2;) {
            if (!diagram[j]) {
              diagram[j] = [];
            }
            diagram[j][i] ? (diagram[j][i] += 1) : (diagram[j][i] = 1);
            i--;
            j--;
          }
        } else {
          for (let j = segment.y1; j <= segment.y2;) {
            if (!diagram[j]) {
              diagram[j] = [];
            }
            diagram[j][i] ? (diagram[j][i] += 1) : (diagram[j][i] = 1);
            i--;
            j++;
          }
        }
      }
    } else {
      for (let i = segment.x1; i <= segment.x2;) {
        if (segment.y1 > segment.y2) {
          for (let j = segment.y1; j >= segment.y2;) {
            if (!diagram[j]) {
              diagram[j] = [];
            }
            diagram[j][i] ? (diagram[j][i] += 1) : (diagram[j][i] = 1);
            i++;
            j--;
          }
        } else {
          for (let j = segment.y1; j <= segment.y2;) {
            if (!diagram[j]) {
              diagram[j] = [];
            }
            diagram[j][i] ? (diagram[j][i] += 1) : (diagram[j][i] = 1);
            i++;
            j++;
          }
        }
      }
    }
  }

  let count = 0;
  for (const row of diagram) {
    if (row) {
      for (const cell of row) {
        if (cell > 1) {
          count++;
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
          input: `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
          expected: 5,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
          expected: 12,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day05/input.txt",
);
