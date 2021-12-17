import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const convertHexaToBinary = (hexa: string) => {
  const binary = [];
  for (let i = 0; i < hexa.length; i++) {
    const hex = hexa[i];
    switch (hex) {
      case "0":
        binary.push("0000");
        break;
      case "1":
        binary.push("0001");
        break;
      case "2":
        binary.push("0010");
        break;
      case "3":
        binary.push("0011");
        break;
      case "4":
        binary.push("0100");
        break;
      case "5":
        binary.push("0101");
        break;
      case "6":
        binary.push("0110");
        break;
      case "7":
        binary.push("0111");
        break;
      case "8":
        binary.push("1000");
        break;
      case "9":
        binary.push("1001");
        break;
      case "a":
      case "A":
        binary.push("1010");
        break;
      case "b":
      case "B":
        binary.push("1011");
        break;
      case "c":
      case "C":
        binary.push("1100");
        break;
      case "d":
      case "D":
        binary.push("1101");
        break;
      case "e":
      case "E":
        binary.push("1110");
        break;
      case "f":
      case "F":
        binary.push("1111");
        break;
      default:
        throw new Error(`Invalid hexadecimal character: ${hex}`);
    }
  }
  return binary.join("");
};

const parsePacket = (
  packet: string,
  versionSum: number = 0,
): [string, number, number] => {
  const version = packet.slice(0, 3);
  // console.log(`Version: ${parseInt(version,2)}`);
  versionSum += parseInt(version, 2);
  // console.log(`Version sum: ${versionSum}`);
  const type = packet.slice(3, 6);
  // console.log(`Type: ${parseInt(type,2)}`);
  let value: number;
  let newPacket: string;
  if (parseInt(type, 2) === 4) {
    let index = 6;
    let binary = "";
    let endOfLiteralValuePacket = false;
    while (!endOfLiteralValuePacket) {
      const group = packet.slice(index, index + 5);
      binary += group.slice(1);
      if (group.charAt(0) === "0") {
        endOfLiteralValuePacket = true;
      }
      index += 5;
    }
    value = parseInt(binary, 2);
    newPacket = packet.slice(index);
    // console.log(`Literal value: ${parseInt(binary, 2)}`);
    // return [packet.slice(index), versionSum, value];
  } else {
    const lengthType = packet[6];
    let valueArray: number[] = [];
    if (lengthType === "0") {
      const subPacketLength = parseInt(packet.slice(7, 22), 2);
      // console.log(`Sub-packet length: ${subPacketLength}`);
      let subPackets = packet.slice(22, 22 + subPacketLength);
      while (subPackets.length > 0) {
        [subPackets, versionSum, value] = parsePacket(subPackets, versionSum);
        valueArray.push(value);
      }
      newPacket = packet.slice(22 + subPacketLength);
      // return [packet.slice(22 + subPacketLength), versionSum, value];
    } else {
      const subPacketsNumber = parseInt(packet.slice(7, 18), 2);
      // console.log(`Sub-packets number: ${subPacketsNumber}`);
      newPacket = packet.slice(18);
      let currentSubPacket = 1;
      while (currentSubPacket <= subPacketsNumber) {
        [newPacket, versionSum, value] = parsePacket(newPacket, versionSum);
        valueArray.push(value);
        currentSubPacket++;
      }
      // return [subPackets, versionSum, value];
    }
    switch (parseInt(type, 2)) {
      case 0:
        value = valueArray.reduce((acc, val) => acc + val, 0);
        break;
      case 1:
        value = valueArray.reduce((acc, val) => acc * val, 1);
        break;
      case 2:
        value = Math.min(...valueArray);
        break;
      case 3:
        value = Math.max(...valueArray);
        break;
      case 5:
        valueArray[0] > valueArray[1] ? (value = 1) : (value = 0);
        break;
      case 6:
        valueArray[0] < valueArray[1] ? (value = 1) : (value = 0);
        break;
      case 7:
        valueArray[0] === valueArray[1] ? (value = 1) : (value = 0);
        break;
      default:
        throw new Error(`Invalid type: ${parseInt(type, 2)}`);
    }
  }
  return [newPacket, versionSum, value];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const packet = convertHexaToBinary(input);
  const versionSum = parsePacket(packet)[1];
  return versionSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const packet = convertHexaToBinary(input);
  const value = parsePacket(packet)[2];
  return value;
};

run(
  {
    part1: {
      tests: [
        {
          input: `A0016C880162017C3686B18A3D4780`,
          expected: 31,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `9C0141080250320F1802104A08`,
          expected: 1,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
  },
  "src/day16/input.txt",
);
