import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type ShapeA = "A" | "B" | "C";
type ShapeB = "X" | "Y" | "Z";
type Round = 1 | 0 | -1;

const scoreShape = (shape: ShapeB) => {
  switch (shape) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
  }
};

const scoreRound = (round: Round) => {
  switch (round) {
    case 1:
      return 6;
    case -1:
      return 0;
    case 0:
      return 3;
  }
};

const game = (a: ShapeA, b: ShapeB) => {
  const rules = {
    A: {
      X: 0,
      Y: 1,
      Z: -1,
    },
    B: {
      X: -1,
      Y: 0,
      Z: 1,
    },
    C: {
      X: 1,
      Y: -1,
      Z: 0,
    },
  };

  const round = rules[a][b] as Round;

  return scoreRound(round) + scoreShape(b);
};

function solution(input: string) {
  const lines = input.split("\n");

  const result = lines.reduce((acc, line) => {
    const [a, b] = line.split(" ") as [ShapeA, ShapeB];
    return acc + game(a, b);
  }, 0);

  return result;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./02/example.txt");
  const actual = solution(input);
  const expected = 15;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./02/input.txt");
  const actual = solution(input);
  const expected = 11906;
  assertEquals(actual, expected);
});
