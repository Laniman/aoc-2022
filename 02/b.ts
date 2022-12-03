import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Shape = "A" | "B" | "C";
type Round = "X" | "Y" | "Z";

const scoreShape = (shape: Shape) => {
  switch (shape) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
  }
};

const scoreRound = (round: Round) => {
  switch (round) {
    case "X":
      return 0;
    case "Y":
      return 3;
    case "Z":
      return 6;
  }
};

const game = (a: Shape, b: Round) => {
  const rules = {
    A: {
      X: "C" as const,
      Y: "A" as const,
      Z: "B" as const,
    },
    B: {
      X: "A" as const,
      Y: "B" as const,
      Z: "C" as const,
    },
    C: {
      X: "B" as const,
      Y: "C" as const,
      Z: "A" as const,
    },
  };

  const shapeB = rules[a][b];

  return scoreRound(b) + scoreShape(shapeB);
};

function solution(input: string) {
  const lines = input.split("\n");

  const result = lines.reduce((acc, line) => {
    const [a, b] = line.split(" ") as [Shape, Round];
    return acc + game(a, b);
  }, 0);

  return result;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./02/example.txt");
  const actual = solution(input);
  const expected = 12;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./02/input.txt");
  const actual = solution(input);
  const expected = 11186;
  assertEquals(actual, expected);
});
