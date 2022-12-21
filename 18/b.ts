import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = { x: number; y: number; z: number };
type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1; z: 0 | 1 | -1 };

const dirs: Direction[] = [
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
];

const calculateCartesian = (a: Point[], b: Point[]) => {
  const setOfPoints = [];
  for (const ac of a) {
    for (const bc of b) {
      const point = { x: ac.x + bc.x, y: ac.y + bc.y, z: ac.z + bc.z };
      setOfPoints.push(point);
    }
  }
  return setOfPoints;
};

const hashPoint = (point: Point) => `${point.x},${point.y},${point.z}`;

function solution(input: string): number {
  const pointsMap = input
    .split("\n")
    .map((line) => line.split(",").map((a) => Number(a)))
    .reduce((acc, [x, y, z]) => {
      const point = { x, y, z };
      const key = hashPoint(point);
      acc[key] = point;
      return acc;
    }, {} as Record<string, Point>);

  const pointsMapValues = Object.values(pointsMap);

  const xs = [];
  const ys = [];
  const zs = [];

  for (const key in pointsMap) {
    const { x, y, z } = pointsMap[key];
    xs.push(x);
    ys.push(y);
    zs.push(z);
  }

  const lowerBound = {
    x: Math.min(...xs) - 1,
    y: Math.min(...ys) - 1,
    z: Math.min(...zs) - 1,
  };
  const upperBound = {
    x: Math.max(...xs) + 1,
    y: Math.max(...ys) + 1,
    z: Math.max(...zs) + 1,
  };

  const isInBounds = (p: Point) =>
    p.x <= upperBound.x &&
    p.x >= lowerBound.x &&
    p.y <= upperBound.y &&
    p.y >= lowerBound.y &&
    p.z <= upperBound.z &&
    p.z >= lowerBound.z;

  const visited: Record<string, Point> = {};
  const searchStack = [lowerBound];

  while (searchStack.length > 0) {
    const p = searchStack.pop()!;
    const k = hashPoint(p);
    if (!(k in visited) && !(k in pointsMap) && isInBounds(p)) {
      visited[k] = p;

      for (const { x: dx, y: dy, z: dz } of dirs) {
        const { x, y, z } = p;
        searchStack.push({ x: x + dx, y: y + dy, z: z + dz });
      }
    }
  }

  return calculateCartesian(pointsMapValues, dirs).reduce(
    (acc, p) => acc + (hashPoint(p) in visited ? 1 : 0),
    0,
  );
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./18/example.txt");
  const actual = solution(input);
  const expected = 58;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./18/input.txt");
  const actual = solution(input);
  const expected = 2564;
  assertEquals(actual, expected);
});
