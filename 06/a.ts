import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const n = 4;

  for (let i = 0; i < input.length; i++) {
    const substring = input.substring(i, i + n);
    const isUniq = (new Set(substring)).size === n;

    if (isUniq) {
      return i + n;
    }
  }
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./06/example-1.txt");
  const actual = solution(input);
  const expected = 7;
  assertEquals(actual, expected);
});

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./06/example-2.txt");
  const actual = solution(input);
  const expected = 5;
  assertEquals(actual, expected);
});

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./06/example-3.txt");
  const actual = solution(input);
  const expected = 6;
  assertEquals(actual, expected);
});

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./06/example-4.txt");
  const actual = solution(input);
  const expected = 10;
  assertEquals(actual, expected);
});

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./06/example-5.txt");
  const actual = solution(input);
  const expected = 11;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./06/input.txt");
  const actual = solution(input);
  const expected = 1598;
  assertEquals(actual, expected);
});
