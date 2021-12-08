import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [patterns, outputs] = input.reduce(
    ([patterns, outputs], line) => {
      const [pattern, output] = line.split(" | ");
      patterns.push(pattern.split(" "));
      outputs.push(output.split(" "));
      return [patterns, outputs];
    },
    [[], []] as [string[][], string[][]],
  );
  let count = 0;
  for (const line of outputs) {
    for (const output of line) {
      if (
        output.length === 2 ||
        output.length === 3 ||
        output.length === 4 ||
        output.length === 7
      ) {
        count++;
      }
    }
  }
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [patterns, outputs] = input.reduce(
    ([patterns, outputs], line) => {
      const [pattern, output] = line.split(" | ");
      patterns.push(pattern.split(" ").map(x => x.split("").sort().join("")));
      outputs.push(output.split(" ").map(x => x.split("").sort().join("")));
      return [patterns, outputs];
    },
    [[], []] as [string[][], string[][]],
  );
  let rosetta: string[] = Array(10);
  let result: number[] = [];
  for (let i = 0; i < patterns.length; i++) {
    while (Object.values(rosetta).length !== rosetta.length) {
      for (let j = 0; j < patterns[i].length; j++) {
        const pattern = patterns[i][j];
        switch (pattern.length) {
          case 2:
            rosetta[1] = pattern;
            break;
          case 3:
            rosetta[7] = pattern;
            break;
          case 4:
            rosetta[4] = pattern;
            break;
          case 7:
            rosetta[8] = pattern;
            break;
          case 5:
            if (rosetta[1]) {
              if (rosetta[1].split('').every(x => pattern.includes(x))) {
                rosetta[3] = pattern;
              }
            }
            if (rosetta[6]) {
              if (pattern.split('').every(x => rosetta[6].includes(x))) {
                rosetta[5] = pattern;
              }
            }
            if (rosetta[3] && rosetta[5]) {
              if (pattern !== rosetta[3] && pattern !== rosetta[5]) {
                rosetta[2] = pattern;
              }
            }
            break;
          case 6:
            if (rosetta[4]) {
              if (rosetta[4].split('').every(x => pattern.includes(x))) {
                rosetta[9] = pattern;
              }
            }
            if (rosetta[9] && rosetta [1]) {
              if (rosetta[1].split('').every(x => pattern.includes(x)) && pattern !== rosetta[9]) {
                rosetta[0] = pattern;
              }
            }
            if (rosetta[9] && rosetta [0]) {
              if (pattern !== rosetta[9] && pattern !== rosetta[0]) {
                rosetta[6] = pattern;
              }
            }
            break;
          default:
            break;
        }
      }
    }
    let digits = '';
    for (let j = 0; j < outputs[i].length; j++) {
      const output = outputs[i][j];
      digits += rosetta.indexOf(output);
    }
    result.push(parseInt(digits));
    rosetta = Array(10);
  }
  return result.reduce((acc, cur) => acc + cur, 0);
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
        `,
          expected: 26,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
        `,
          expected: 61229,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day08/input.txt",
);
