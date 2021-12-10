import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const illegalCharacters: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const openingCharacters: string[] = [];
    const line = input[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char.match(/[([{<]/)) {
        openingCharacters.push(char);
      } else {
        if (char === ')' && openingCharacters.pop() !== "(") {
          illegalCharacters.push(char);
          break;
        }
        if (char === ']' && openingCharacters.pop() !== "[") {
          illegalCharacters.push(char);
          break;
        }
        if (char === '}' && openingCharacters.pop() !== "{") {
          illegalCharacters.push(char);
          break;
        }
        if (char === '>' && openingCharacters.pop() !== "<") {
          illegalCharacters.push(char);
          break;
        }
      }
    }
  }
  const score = illegalCharacters.reduce((score, char) => {
    switch (char) {
      case ')':
        return score + 3;
      case ']':
        return score + 57;
      case '}':
        return score + 1197;
      case '>':
        return score + 25137;
      default:
        return score;
    }
  }, 0);

  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const allMissingCharacters: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    const openingCharacters: string[] = [];
    let isCorrupted: boolean = false;
    const line = input[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char.match(/[([{<]/)) {
        openingCharacters.push(char);
      } else if (char === ')' && openingCharacters.pop() !== "("
              || char === ']' && openingCharacters.pop() !== "["
              || char === '}' && openingCharacters.pop() !== "{"
              || char === '>' && openingCharacters.pop() !== "<") {
        isCorrupted = true;
        break;
      }
    }
    if (!isCorrupted && openingCharacters.length > 0) {
      const lineMissingCharacters: string[] = [];
      for (let j = openingCharacters.length - 1; j >= 0; j--) {
        const char = openingCharacters[j];
        switch (char) {
          case '(':
            lineMissingCharacters.push(')');
            break;
          case '[':
            lineMissingCharacters.push(']');
            break;
          case '{':
            lineMissingCharacters.push('}');
            break;
          case '<':
            lineMissingCharacters.push('>');
            break;
        }
      }
      allMissingCharacters.push(lineMissingCharacters);
    }
  }
  const scores = allMissingCharacters.map(lineMissingCharacter => {
    return lineMissingCharacter.reduce((score, char) => {
      switch (char) {
        case ')':
          return score * 5 + 1;
        case ']':
          return score * 5 + 2;
        case '}':
          return score * 5 + 3;
        case '>':
          return score * 5 + 4;
        default:
          return score;
      }
    }, 0);
  });
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        [({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]
        `,
          expected: 26397,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        [({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]
        `,
          expected: 288957,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day10/input.txt",
);
