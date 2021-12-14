import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const isUpperCase = (char: string) => {
  return char.toUpperCase() === char;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = new Map<string, string[]>();
  input.forEach((line) => {
    const [from, to] = line.split("-");
    const node1 = graph.get(from) || [];
    if (!node1.includes(to)) {
      node1.push(to);
      graph.set(from, node1);
    }
    const node2 = graph.get(to) || [];
    if (!node2.includes(from)) {
      node2.push(from);
      graph.set(to, node2);
    }
  });
  let count = 0;
  const visited = ["start"];
  const countPaths = (visited: string[]) => {
    const current = visited.at(-1)!;
    if (current == "end") {
      count++;
      return;
    }

    graph
      .get(current)
      ?.filter(
        (nextNode) => isUpperCase(nextNode) || !visited.includes(nextNode),
      )
      .forEach((nextNode) => countPaths([...visited, nextNode]));
  };
  countPaths(visited);
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = new Map<string, string[]>();
  input.forEach((line) => {
    const [from, to] = line.split("-");
    const node1 = graph.get(from) || [];
    if (!node1.includes(to)) {
      node1.push(to);
      graph.set(from, node1);
    }
    const node2 = graph.get(to) || [];
    if (!node2.includes(from)) {
      node2.push(from);
      graph.set(to, node2);
    }
  });
  let count = 0;
  const visited = ["start"];
  const countPaths = (visited: string[], doubleVisitedCave = false) => {
    const current = visited.at(-1)!;
    if (current == "end") {
      count++;
      return;
    }

    graph
      .get(current)
      ?.filter(
        (nextNode) => isUpperCase(nextNode) || !visited.includes(nextNode) || (!doubleVisitedCave && nextNode !== "start"),
      )
      .forEach((nextNode) =>
        countPaths([...visited, nextNode],
        doubleVisitedCave || (!isUpperCase(nextNode) && visited.includes(nextNode)),
      ));
  };
  countPaths(visited);
  return count;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
          start-A
          start-b
          A-c
          A-b
          b-d
          A-end
          b-end
          `,
          expected: 10,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
          start-A
          start-b
          A-c
          A-b
          b-d
          A-end
          b-end
          `,
          expected: 36,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day12/input.txt",
);
