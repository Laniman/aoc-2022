import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = [number, number];

const dist = (p: Point, q: Point) =>
  [p[0] - q[0], p[1] - q[1]].map((z) => Math.abs(z)).reduce((a, b) => a + b);

const combinations = <T>(list: T[]) =>
  list
    .map((elem, index) => {
      return list.slice(index + 1).map<[T, T]>((
        otherElem,
      ) => [elem, otherElem]);
    })
    .reduce((acc, elem) => acc.concat(elem), []);

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
    .map(([a, b, c, d]) => [[a, b] as Point, [c, d] as Point]);

  for (const [[s1, c1], [s2, c2]] of combinations(beacons)) {
    const d1 = dist(s1, c1) + 1;
    const d2 = dist(s2, c2) + 1;
    const [x1, y1] = s1;
    const [x2, y2] = s2;

    const xx1Values = [d1, -d1];
    const xx2Values = [d2, -d2];
    const xx3Values = [y1 - y2, y2 - y1];
    const yy1Values = [d1, -d1];
    const yy2Values = [d2, -d2];
    const yy3Values = [x1 - x2, x2 - x1];

    for (const xx1 of xx1Values) {
      for (const xx2 of xx2Values) {
        for (const xx3 of xx3Values) {
          const xx = x1 + x2 + xx1 + xx2 + xx3;
          for (const yy1 of yy1Values) {
            for (const yy2 of yy2Values) {
              for (const yy3 of yy3Values) {
                const yy = y1 + y2 + yy1 + yy2 + yy3;
                const p = [Math.floor(xx / 2), Math.floor(yy / 2)] as Point;
                const inBorder = p.every((_) => 0 <= _ && _ <= border);
                const isOutsideOfScanners = beacons.every(([s, c]) =>
                  dist(s, p) > dist(s, c)
                );
                if (inBorder && isOutsideOfScanners) {
                  return p[0] * 4_000_000 + p[1];
                }
              }
            }
          }
        }
      }
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
