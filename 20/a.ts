import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const swap = <T>(arr: T[], i: number, j: number) => {
  const ii = i >= 0 ? i : arr.length + i;
  const jj = j >= 0 ? j : arr.length + j;
  [arr[jj], arr[ii]] = [arr[ii], arr[jj]];
};

const mix = (originalList: number[]) => {
  const length = originalList.length;
  const mixedList = originalList
    .slice()
    .map((n, i) => [i, n] as [number, number]);

  originalList.forEach((n, i) => {
    let position = mixedList.findIndex(([k]) => k === i);
    if (n > 0) {
      for (let i = 0; i < n % (length - 1); i++) {
        swap(mixedList, position, (position + 1) % length);
        position = (position + 1) % length;
      }
    } else if (n < 0) {
      for (let i = 0; i < -n % (length - 1); i++) {
        swap(mixedList, position, (position - 1) % length);
        position = (position - 1) % length;
      }
    }
  });

  return mixedList;
};

function solution(input: string): number {
  const originalList = input.split("\n").map((n) => Number(n));
  const length = originalList.length;
  const mixedList = mix(originalList);
  const zeroIndex = mixedList.findIndex(([_, n]) => n === 0);
  return [
    mixedList[(zeroIndex + 1000) % length][1],
    mixedList[(zeroIndex + 2000) % length][1],
    mixedList[(zeroIndex + 3000) % length][1],
  ].reduce((a, b) => a + b);
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./20/example.txt");
  const actual = solution(input);
  const expected = 3;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./20/input.txt");
  const actual = solution(input);
  const expected = 11037;
  assertEquals(actual, expected);
});
