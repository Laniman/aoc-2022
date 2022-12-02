Deno.chdir("./02");

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

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

const result = lines.reduce((acc, line) => {
  const [a, b] = line.split(" ") as [Shape, Round];
  return acc + game(a, b);
}, 0);

console.log(result);
