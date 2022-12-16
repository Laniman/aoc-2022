import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = [number, number];

const dist = (p: Point, q: Point) =>
  [p[0] - q[0], p[1] - q[1]].map((z) => Math.abs(z)).reduce((a, b) => a + b);

function solution(input: string, targetRow: number) {
  const beacons = input
    .split("\n")
    .map((line) => {
      const numericRegexp = /-?\d+/g;
      return line.match(numericRegexp)!.map((s) => Number(s)) as [
        number,
        number,
        number,
        number,
      ];
    })
    .map(([a, b, c, d]) => [[a, b] as Point, [c, d] as Point]);

  const intervals = [];
  for (const [sensor, closest] of beacons) {
    const d = dist(sensor, closest);
    const h = Math.abs(sensor[1] - targetRow);
    const r = d - h;
    if (r > 0) {
      intervals.push([sensor[0] - r, sensor[0] + r]);
    }
  }

  intervals.sort((a, b) => a[0] - b[0]);

  let i = 0;
  while (i < intervals.length - 1) {
    const [_x1, x2] = intervals[i];
    const [xx1, xx2] = intervals[i + 1];
    if (x2 >= xx1) {
      intervals[i][1] = Math.max(x2, xx2);
      intervals.splice(i + 1, 1);
      continue;
    }
    i++;
  }

  const result = intervals.map(([x1, x2]) => x2 - x1).reduce((a, b) => a + b);
  return result;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./15/example.txt");
  const y = 10;
  const actual = solution(input, y);
  const expected = 26;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./15/input.txt");
  const y = 2_000_000;
  const actual = solution(input, y);
  const expected = 5508234;
  assertEquals(actual, expected);
});
