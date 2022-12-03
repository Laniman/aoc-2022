import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const scoreLetter = (letter: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
};

function solution(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  lines.forEach((rucksack) => {
    const half = rucksack.length / 2;
    const slice = rucksack.slice(half, rucksack.length);
    const set = new Set(slice);
    const char = rucksack
      .slice(0, half)
      .split("")
      .find((char) => {
        return set.has(char);
      })!;

    sum += scoreLetter(char);
  });

  return sum;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./03/example.txt");
  const actual = solution(input);
  const expected = 157;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./03/input.txt");
  const actual = solution(input);
  const expected = 7831;
  assertEquals(actual, expected);
});
