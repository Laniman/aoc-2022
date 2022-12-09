import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Coordinate = [number, number];

function solution(input: string) {
  const series = input.split("\n").map((line) => {
    const [direction, stepsCount] = line.split(" ");
    return [
      direction,
      parseInt(stepsCount, 10),
    ];
  });

  const visited = new Set<string>();

  const markVisited = (coord: Coordinate) => {
    visited.add(coord.join(""));
  };

  const rope: Coordinate[] = Array.from({ length: 10 }, () => [0, 0]);

  markVisited([0, 0]);

  series.forEach(([direction, stepsCount]) => {
    for (let i = 1; i <= stepsCount; i++) {
      const [head, ...rest] = rope;

      switch (direction) {
        case "R":
          head[0]++;
          break;
        case "L":
          head[0]--;
          break;
        case "U":
          head[1]++;
          break;
        case "D":
          head[1]--;
          break;
      }

      const next: Coordinate = [...head];
      rest.forEach((knot) => {
        const dx = next[0] - knot[0];
        const dy = next[1] - knot[1];

        if (Math.abs(dx) > 1) {
          knot[0] += dx > 0 ? 1 : -1;

          if (Math.abs(dy) > 0) {
            knot[1] += dy > 0 ? 1 : -1;
          }
        } else if (Math.abs(dy) > 1) {
          knot[1] += dy > 0 ? 1 : -1;

          if (Math.abs(dx) > 0) {
            knot[0] += dx > 0 ? 1 : -1;
          }
        }

        next[0] = knot[0];
        next[1] = knot[1];
      });

      markVisited(next);
    }
  });

  return visited.size;
}

Deno.test("example 1", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./09/example-1.txt");
  const actual = solution(input);
  const expected = 1;
  assertEquals(actual, expected);
});

Deno.test("example 2", () => {
  const input = Deno.readTextFileSync("./09/example-2.txt");
  const actual = solution(input);
  const expected = 36;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./09/input.txt");
  const actual = solution(input);
  const expected = 2691;
  assertEquals(actual, expected);
});
