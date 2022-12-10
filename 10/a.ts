import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const lines = input.split("\n").map((line) => {
    const [command, number] = line.split(" ");
    return number ? [command, Number(number)] : [command];
  });

  const targetCycles = [20, 60, 100, 140, 180, 220];

  let valueOfRegister = 1;
  let cycle = 1;
  let target = targetCycles.shift();
  let state = "idle";
  let i = 0;
  let execution = 0;
  let s = 0;

  while (true) {
    if (i >= lines.length) {
      break;
    }

    if (target === cycle) {
      s += cycle * valueOfRegister;
      target = targetCycles.shift();
    }

    const [command, arg] = lines[i];

    if (state === "busy") {
      cycle += 1;
      execution -= 1;
      if (execution === 0) {
        state = "idle";

        if (command === "addx") {
          valueOfRegister += arg as number;
        }

        i += 1;
      }
    } else {
      if (command === "noop") {
        state = "busy";
        execution = 1;
      } else if (command === "addx") {
        state = "busy";
        execution = 2;
      }
    }
  }

  return s;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./10/example.txt");
  const actual = solution(input);
  const expected = 13140;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./10/input.txt");
  const actual = solution(input);
  const expected = 12520;
  assertEquals(actual, expected);
});
