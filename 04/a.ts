import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const lines = input.split("\n").map((line) => line.split(","));
  let sum = 0;

  lines.forEach((line) => {
    const [a, b] = line.map((range) => range.split("-").map((n) => Number(n)));

    if (a[0] <= b[0] && a[1] >= b[1]) {
      sum++;
    } else if (b[0] <= a[0] && b[1] >= a[1]) {
      sum++;
    }
  });

  return sum;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./04/example.txt");
  const actual = solution(input);
  const expected = 2;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./04/input.txt");
  const actual = solution(input);
  const expected = 644;
  assertEquals(actual, expected);
});
