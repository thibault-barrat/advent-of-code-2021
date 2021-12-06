import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let gamma = '';
  let epsilon = '';

  for (let i = 0; i < input[0].length; i++) {
    gamma += input.filter(row => row.charAt(i) === '1').length >= input.length / 2 ? '1' : '0';
    epsilon += input.filter(row => row.charAt(i) === '0').length >= input.length / 2 ? '1' : '0';
  }
  
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const bitArray = input.reduce(
    (acc, current) => {
      for (let i = 0; i < current.length; i++) {
        acc[i] = acc[i] ? acc[i] + current.charAt(i) : current.charAt(i);
      }
      return acc;
    }, [] as string[]);

  let oxygen = input;
  let co2 = input;
  let i = 0;
  let j = 0;
  while (oxygen.length > 1 && i < oxygen[0].length) {
    // we filter the array to obtain the number of item that have a 1 in the i position
    // if there is more item than half of the array, it means there is more 1 than 0 in i position
    // so we keep only the item that have a 1 in the i position
    // else we keep only the item that have a 0 in the i position
    oxygen = oxygen.filter(row => row.charAt(i) === '1').length >= oxygen.length / 2 ? oxygen.filter(row => row.charAt(i) === '1') : oxygen.filter(row => row.charAt(i) === '0');
    i++;
  }

  while (co2.length > 1 && j < co2[0].length) {
    co2 = co2.filter(row => row.charAt(j) === '1').length >= co2.length / 2 ? co2.filter(row => row.charAt(j) === '0') : co2.filter(row => row.charAt(j) === '1');
    j++;
  }

  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);;
};

run({
  part1: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
}, "src/day03/input.txt");
