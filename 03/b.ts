import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const scoreLetter = (letter: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
};

function solution(input: string) {
  const lines = input.split("\n");

  const [chunked] = lines.reduce<[string[][], string[]]>(
    ([acc, chunk], line) => {
      chunk.push(line);

      if (chunk.length === 3) {
        acc.push(chunk);
        return [acc, []];
      }

      return [acc, chunk];
    },
    [[], []]
  );

  const result = chunked
    .map((chunk) => {
      const [first, second, third] = chunk
        .map((line) => line.split(""))
        .map((line) => new Set(line));

      for (const s of first) {
        if (second.has(s) && third.has(s)) {
          return s;
        }
      }
    })
    .reduce((acc, s) => acc + scoreLetter(s!), 0);

  return result;
}

Deno.test("example", () => {
    const input = Deno.readTextFileSync("./03/example.txt");
  const actual = solution(input);
  const expected = 70;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./03/input.txt");
  const actual = solution(input);
  const expected = 2683;
  assertEquals(actual, expected);
});
