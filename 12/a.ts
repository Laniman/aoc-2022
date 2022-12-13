import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = [number, number];

const stringify = (a: Point) => {
  return `[${a[0]},${a[1]}]`;
};

interface Args {
  grid: string[];
  source: Point;
  isEnd: (node: Point) => boolean;
  childFilter: (child: Point, parent: Point) => boolean;
}

function findShortestDistance({ grid, source, isEnd, childFilter }: Args) {
  const distances = new Map<string, number>();
  distances.set(stringify(source), 0);

  const queue: Point[] = [];
  queue.push(source);

  const previous = new Map<string, Point>();
  const visited = new Set<string>();

  while (queue.length > 0) {
    const node = queue.shift()!;
    const [x, y] = node;
    const nodeStr = stringify(node);

    if (visited.has(nodeStr)) {
      continue;
    }

    if (isEnd(node)) {
      return {
        shortestDistance: distances.get(nodeStr),
        distances,
        previous,
      };
    }

    visited.add(nodeStr);

    const children = [
      [x + 1, y] as Point,
      [x - 1, y] as Point,
      [x, y + 1] as Point,
      [x, y - 1] as Point,
    ]
      .filter(([x, y]) =>
        x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
      )
      .filter((child) => childFilter(child, node));

    for (const neighbor of children) {
      const neighborStr = stringify(neighbor);
      const distance = distances.get(nodeStr)! + 1;

      if (
        !distances.has(neighborStr) || distance < distances.get(neighborStr)!
      ) {
        distances.set(neighborStr, distance);
        previous.set(neighborStr, node);
        queue.push(neighbor);
      }
    }
  }

  throw new Error(
    `Can't find shortest path from '${stringify(source)}' to target point`,
  );
}

function solution(input: string) {
  const lines = input.split("\n");

  const findStartAndEnd = () => {
    const result = {} as { start: Point; end: Point };
    for (let i = 0; i < lines.length; i++) {
      const indexS = lines[i].indexOf("S");
      const indexE = lines[i].indexOf("E");
      if (indexS !== -1) {
        result.start = [indexS, i];
      }

      if (indexE !== -1) {
        result.end = [indexE, i];
      }
    }

    return result as { start: Point; end: Point };
  };

  const { start } = findStartAndEnd();
  const { shortestDistance } = findShortestDistance({
    grid: lines,
    source: start,
    isEnd: (node) => lines[node[1]][node[0]] === "E",
    childFilter: (child, parent) => {
      const [childHeight, parentHeight] = [child, parent].map(([x, y]) => {
        const value = lines[y][x];

        if (value === "S") {
          return "a".charCodeAt(0);
        }

        if (value === "E") {
          return "z".charCodeAt(0);
        }

        return value.charCodeAt(0);
      });

      return childHeight <= parentHeight + 1;
    },
  });

  return shortestDistance;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./12/example.txt");
  const actual = solution(input);
  const expected = 31;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./12/input.txt");
  const actual = solution(input);
  const expected = 383;
  assertEquals(actual, expected);
});
