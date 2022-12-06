import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const n = 14;

  for (let i = 0; i < input.length; i++) {
    const substring = input.substring(i, i + n);
    const isUniq = (new Set(substring)).size === n;

    if (isUniq) {
      return i + n;
    }
  }
}

Deno.test("example 1", () => {
  const input = Deno.readTextFileSync("./06/example-1.txt");
  const actual = solution(input);
  const expected = 19;
  assertEquals(actual, expected);
});

Deno.test("example 2", () => {
  const input = Deno.readTextFileSync("./06/example-2.txt");
  const actual = solution(input);
  const expected = 23;
  assertEquals(actual, expected);
});

Deno.test("example 3", () => {
  const input = Deno.readTextFileSync("./06/example-3.txt");
  const actual = solution(input);
  const expected = 23;
  assertEquals(actual, expected);
});

Deno.test("example 4", () => {
  const input = Deno.readTextFileSync("./06/example-4.txt");
  const actual = solution(input);
  const expected = 29;
  assertEquals(actual, expected);
});

Deno.test("example 5", () => {
  const input = Deno.readTextFileSync("./06/example-5.txt");
  const actual = solution(input);
  const expected = 26;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./06/input.txt");
  const actual = solution(input);
  const expected = 2414;
  assertEquals(actual, expected);
});
