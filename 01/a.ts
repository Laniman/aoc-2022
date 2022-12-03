import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const lines = input.split("\n\n");

  const totals = lines.map((line) => {
    return line.split("\n").reduce((acc, item) => acc + Number(item), 0);
  });

  const max = Math.max(...totals);

  return max;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./01/example.txt");
  const actual = solution(input);
  const expected = 24000;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./01/input.txt");
  const actual = solution(input);
  const expected = 64929;
  assertEquals(actual, expected);
});
