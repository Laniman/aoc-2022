import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const series = input.split("\n").map((line) => {
    const [direction, stepsCount] = line.split(" ");
    return [
      direction,
      parseInt(stepsCount, 10),
    ];
  });

  const visited = new Set<string>();

  const markVisited = (coord: [number, number]) => {
    visited.add(coord.join(""));
  };

  const tail: [number, number] = [0, 0];
  const prevHead: [number, number] = [0, 0];
  const head: [number, number] = [0, 0];

  const isNear = () => {
    const x = Math.abs(head[0] - tail[0]);
    const y = Math.abs(head[1] - tail[1]);

    return x <= 1 && y <= 1;
  };

  markVisited(tail);

  series.forEach(([direction, stepsCount]) => {
    for (let i = 1; i <= stepsCount; i++) {
      prevHead[0] = head[0];
      prevHead[1] = head[1];

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

      if (!isNear()) {
        tail[0] = prevHead[0];
        tail[1] = prevHead[1];
        markVisited(tail);
      }
    }
  });

  return visited.size;
}

Deno.test("example 1", () => {
  const input = Deno.readTextFileSync("./09/example-1.txt");
  const actual = solution(input);
  const expected = 13;
  assertEquals(actual, expected);
});

Deno.test("example 2", () => {
  const input = Deno.readTextFileSync("./09/example-2.txt");
  const actual = solution(input);
  const expected = 88;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./09/input.txt");
  const actual = solution(input);
  const expected = 6494;
  assertEquals(actual, expected);
});
