import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string): number {
  const monkeys: Record<string, number> = {};
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [name, expression] = line.split(": ");

    if (Number.isInteger(Number(expression))) {
      monkeys[name] = Number(expression);
    } else {
      const [left, op, right] = expression.split(" ");
      if (left in monkeys && right in monkeys) {
        monkeys[name] = eval(`${monkeys[left]} ${op} ${monkeys[right]}`);
      } else {
        lines.push(line);
      }
    }
  }

  return monkeys.root;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./21/example.txt");
  const actual = solution(input);
  const expected = 152;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./21/input.txt");
  const actual = solution(input);
  const expected = 223971851179174;
  assertEquals(actual, expected);
});
