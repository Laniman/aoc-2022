import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const [stacksStr, rearrangementStr] = input.split("\n\n");
  const rearrangement = rearrangementStr.split("\n");
  const stacks = stacksStr.split("\n");

  const nums = stacks.splice(-1, 1)[0].split("");
  const stacksArr = Array.from(
    { length: Number(nums.at(-2)) },
    () => [],
  ) as string[][];

  stacks.slice().reverse().forEach((stack) => {
    nums.forEach((num, i) => {
      const n = Number(num);
      if (n > 0 && stack[i] !== " ") {
        stacksArr[n - 1].push(stack[i]);
      }
    });
  });

  rearrangement.forEach((proc) => {
    const [count, from, to] = proc.match(/\d+/g)!.map((n) => Number(n));
    const elem = stacksArr[from - 1].splice(-count, count);
    stacksArr[to - 1].push(...elem);
  });

  return stacksArr.reduce((acc, stack) => acc + stack.at(-1), "");
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./05/example.txt");
  const actual = solution(input);
  const expected = "MCD";
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./05/input.txt");
  const actual = solution(input);
  const expected = "LVMRWSSPZ";
  assertEquals(actual, expected);
});
