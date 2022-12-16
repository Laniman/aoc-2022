import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = [number, number];

const dist = (p: Point, q: Point) =>
  [p[0] - q[0], p[1] - q[1]].map((z) => Math.abs(z)).reduce((a, b) => a + b);

const getIntervals = (beacons: [Point, Point][], border: number) => {
  const intervals: [number, number][] = [];
  for (const [sensor, closest] of beacons) {
    const d = dist(sensor, closest);
    const h = Math.abs(sensor[1] - border);
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

  return intervals;
};

const calcResult = ([x, y]: Point) => x * 4_000_000 + y;

function solution(input: string, border: number) {
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
    .map(([a, b, c, d]) =>
      [[a, b] as Point, [c, d] as Point] as [Point, Point]
    );

  for (let i = 0; i <= border; i++) {
    const intervals = getIntervals(beacons, i);
    const [[start, end]] = intervals;
    switch (intervals.length) {
      case 1:
        if (start > 0) {
          return calcResult([0, i]);
        }
        if (end < border) {
          return calcResult([0, i]);
        }
        continue;
      case 2:
        return calcResult([end + 1, i]);
      default:
        throw new Error("The search point must be unique");
    }
  }

  throw new Error("Search point not found");
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./15/example.txt");
  const border = 20;
  const actual = solution(input, border);
  const expected = 56000011;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./15/input.txt");
  const border = 4_000_000;
  const actual = solution(input, border);
  const expected = 10457634860779;
  assertEquals(actual, expected);
});
