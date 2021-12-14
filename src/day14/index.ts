import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let template = input[0];
  const rules = new Map<string, string>();
  input.slice(2).forEach((line) => {
    const [adjacents, inserted] = line.split(' -> ');
    rules.set(adjacents, inserted);
  });

  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < template.length - 1; j = j + 2) {
      if (rules.has(template.slice(j, j + 2))) {
        template = template.slice(0, j + 1) + rules.get(template.slice(j, j + 2)) + template.slice(j + 1);
      }
    }
  }

  const counter = new Map<string, number>();
  for (let i = 0; i < template.length; i++) {
    counter.set(template[i], (counter.get(template[i]) || 0) + 1);
  }


  return (Math.max(...counter.values()) - Math.min(...counter.values()));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let template = input[0];
  const rules = new Map<string, string>();
  input.slice(2).forEach((line) => {
    const [adjacents, inserted] = line.split(' -> ');
    rules.set(adjacents, inserted);
  });
  let pairCounter = new Map<string, number>();
  for (let i = 0; i < template.length - 1; i++) {
    pairCounter.set(template.slice(i, i + 2), (pairCounter.get(template.slice(i, i + 2)) || 0) + 1);
  }
  for (let i = 1; i <= 40; i++) {
    let tempCounter = new Map<string, number>();
    for (const [key, value] of pairCounter.entries()) {
      if (rules.has(key)) {
        tempCounter.set(key[0] + rules.get(key), (tempCounter.get(key[0] + rules.get(key)) || 0) + value);
        tempCounter.set(rules.get(key) + key[1], (tempCounter.get(rules.get(key) + key[1]) || 0) + value);

      }
    }

    pairCounter = tempCounter;
  }

   const counter = new Map<string, number>();

  const pairCounterArray = Array.from(pairCounter.entries());
  pairCounterArray.forEach((pair, index) => {
    const [key, value] = pair;
    counter.set(key.charAt(0), (counter.get(key.charAt(0)) || 0) + value);
    if (index === pairCounterArray.length - 1) {
      counter.set(key.charAt(1), (counter.get(key.charAt(1)) || 0) + 1);
    }

  });
  console.log(counter);

  return (Math.max(...counter.values()) - Math.min(...counter.values()));
};

run({
  part1: {
    tests: [
      {
        input: `
        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C
`,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C
`,
        expected: 2188189693529,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
},
"src/day14/input.txt");
