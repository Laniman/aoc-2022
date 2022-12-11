import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Monkey = {
  id: number;
  items: number[];
  operation: (worry: number) => number;
  test: (worry: number) => number;
};

function solution(input: string) {
  const monkeys = input.split("\n\n").map<Monkey>((line) => {
    const note = line.split("\n");
    return {
      id: Number(note[0].split(" ")[1].replace(":", "")),
      items: note[1].split(": ")[1].split(", ").map((n) => Number(n)),
      operation: (worry) => {
        const [op, arg] = note[2].split("new = old ")[1].split(" ");
        const parsedArg = arg === "old" ? worry : Number(arg);

        if (op === "+") {
          return worry + parsedArg;
        }

        if (op === "*") {
          return worry * parsedArg;
        }

        throw new Error(`Invalid operator: ${op}`);
      },
      test: (worry) => {
        const n = Number(note[3].split("divisible by ")[1]);
        const trueResult = Number(note[4].split("throw to monkey ")[1]);
        const falseResult = Number(note[5].split("throw to monkey ")[1]);
        if (worry % n === 0) {
          return trueResult;
        } else {
          return falseResult;
        }
      },
    };
  });

  const leaderboard: number[] = Array.from({ length: monkeys.length }, () => 0);

  for (let i = 1; i <= 20; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const worry = monkey.items.shift()!;
        const nextWorry = Math.floor(monkey.operation(worry) / 3);
        const nextMonkey = monkey.test(nextWorry);
        monkeys[nextMonkey].items.push(nextWorry);
        leaderboard[monkey.id]++;
      }
    });
  }

  const result = leaderboard
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);

  return result;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./11/example.txt");
  const actual = solution(input);
  const expected = 10605;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./11/input.txt");
  const actual = solution(input);
  const expected = 112221;
  assertEquals(actual, expected);
});
