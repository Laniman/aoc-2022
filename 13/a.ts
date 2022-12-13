import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Data = number | Data[];

const makeArray = (x: Data) => {
  return typeof x === "number" ? [x] : x;
};

const compare = (left: Data, right: Data): -1 | 0 | 1 => {
  if (typeof left === "number" && typeof right === "number") {
    if (left > right) {
      return 1;
    }

    if (left < right) {
      return -1;
    }

    return 0;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const c = compare(left[i], right[i]);

      if (c !== 0) {
        return c;
      }
    }

    if (left.length > right.length) {
      return 1;
    }

    if (left.length < right.length) {
      return -1;
    }

    return 0;
  }

  return compare(makeArray(left), makeArray(right));
};

function solution(input: string) {
  const pairs = input
    .split("\n\n")
    .map((pairsStr) =>
      pairsStr.split("\n").map((list) => JSON.parse(list)) as [Data, Data]
    );

  let i = 0;
  let s = 0;

  pairs.forEach(([a, b]) => {
    i++;

    if (compare(a, b) === -1) {
      s += i;
    }
  });

  return s;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./13/example.txt");
  const actual = solution(input);
  const expected = 13;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./13/input.txt");
  const actual = solution(input);
  const expected = 5350;
  assertEquals(actual, expected);
});
