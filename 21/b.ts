import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const findRoot = (lines: string[], humn: number): [number, number] => {
  const monkeys: Record<string, number> = {
    humn,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [name, expression] = line.split(": ");

    if (name in monkeys) {
      continue;
    }

    if (Number.isInteger(Number(expression))) {
      monkeys[name] = Number(expression);
    } else {
      const [left, op, right] = expression.split(" ");
      if (left in monkeys && right in monkeys) {
        if (name === "root") {
          return [monkeys[left], monkeys[right]];
        }
        monkeys[name] = eval(`${monkeys[left]} ${op} ${monkeys[right]}`);
      } else {
        lines.push(line);
      }
    }
  }

  throw new Error(" not found 'root'");
};

function solution(input: string): number {
  const lines = input.split("\n");
  let lowerBound = 0;
  let upperBound = Number.MAX_SAFE_INTEGER / 2;
  const modifier = findRoot(lines, 1).reduce((a, b) => b - a);

  while (lowerBound < upperBound) {
    const mid = Math.floor((lowerBound + upperBound) / 2);
    const [a, b] = findRoot(lines, mid);
    if (a === b) {
      return mid;
    } else {
      const searchDirection = modifier > 0 ? a > b : a < b;
      if (searchDirection) {
        upperBound = mid;
      } else {
        lowerBound = mid;
      }
    }
  }

  throw new Error("outer bounds");
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./21/example.txt");
  const actual = solution(input);
  const expected = 301;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./21/input.txt");
  const actual = solution(input);
  const expected = 3379022190351;
  assertEquals(actual, expected);
});
