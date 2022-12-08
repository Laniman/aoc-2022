import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const check = (
    matrix: number[][],
    y: number,
    x: number,
    dx: number,
    dy: number,
  ) => {
    const target = matrix[y][x];
    let result = true;

    while (true) {
      if (
        y === matrix.length - 1 ||
        x === matrix[y].length - 1 ||
        y === 0 ||
        x === 0
      ) {
        break;
      }

      if (target <= matrix[y + dy][x + dx]) {
        result = false;
        break;
      }

      x += dx;
      y += dy;
    }

    return result;
  };

  const lines = input.split("\n").map((line) =>
    line.split("").map((n) => Number(n))
  );

  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (
        j === 0 || j === line.length - 1 || i === 0 || i === lines.length - 1
      ) {
        sum++;
        continue;
      }

      if (
        check(lines, i, j, -1, 0) ||
        check(lines, i, j, 0, -1) ||
        check(lines, i, j, 1, 0) ||
        check(lines, i, j, 0, 1)
      ) {
        sum++;
      }
    }
  }

  return sum;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./08/example.txt");
  const actual = solution(input);
  const expected = 21;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./08/input.txt");
  const actual = solution(input);
  const expected = 1823;
  assertEquals(actual, expected);
});
