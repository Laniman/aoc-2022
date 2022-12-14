import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = [number, number];
type Grid = ("#" | "." | "o" | "+")[][];

const _printGrid = (grid: Grid) => {
  const canvas = grid.map((line) => line.slice(450, 550).join("")).join("\n");
  console.log(canvas);
};

const findMaxXY = (lines: Point[][]) => {
  let maxX = 0;
  let maxY = 0;

  lines.forEach((lines) => {
    lines.forEach(([x, y]) => {
      if (x > maxX) {
        maxX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
    });
  });

  return [maxX, maxY];
};

const fillGrid = (lines: Point[][], sandSpawn: Point): Grid => {
  const [maxScanX, maxScanY] = findMaxXY(lines);

  const [maxX, maxY] = [maxScanX * maxScanX, maxScanY + 2];
  lines.push([[0, maxY], [maxX, maxY]]);

  const grid: ("#" | "." | "o" | "+")[][] = Array.from(
    { length: maxY + 1 },
    () => Array.from({ length: maxX + 1 }, () => "."),
  );

  lines.forEach((line) => {
    let prevPoint: null | Point = null;

    line.forEach((point) => {
      const [x, y] = point;
      if (prevPoint === null) {
        prevPoint = point;
        grid[y][x] = "#";
        return;
      }

      const d = [prevPoint[0] - point[0], prevPoint[1] - point[1]];
      const pos = d[0] ? 0 : 1; // pos = 0 | d = [2,0]
      for (let xy = prevPoint[pos]; xy != point[pos];) {
        if (d[pos] < 0) {
          xy++;
        } else {
          xy--;
        }
        grid[pos === 1 ? xy : y][pos === 0 ? xy : x] = "#";
      }

      prevPoint = point;
    });
  });

  grid[sandSpawn[1]][sandSpawn[0]] = "+";

  return grid;
};

function solution(input: string) {
  const lines = input
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((str) =>
        str.split(",").map((p) => Number(p)) as Point
      )
    );

  const sandSpawn: Point = [500, 0];
  const grid = fillGrid(lines, sandSpawn);

  let stable = 0;
  let sand: null | Point = null;

  while (true) {
    if (!sand) {
      sand = sandSpawn.slice() as Point;
    }

    while (true) {
      let next = () => grid?.[sand![1] + 1]?.[sand![0]];
      if (!next()) {
        return stable;
      } else if (next() === ".") {
        sand[1]++;
        continue;
      }

      next = () => grid?.[sand![1] + 1]?.[sand![0] - 1];
      if (!next()) {
        return stable;
      } else if (next() === ".") {
        sand[0]--;
        sand[1]++;
        continue;
      }

      next = () => grid?.[sand![1] + 1]?.[sand![0] + 1];
      if (!next()) {
        return stable;
      } else if (next() === ".") {
        sand[0]++;
        sand[1]++;
        continue;
      }

      break;
    }

    if (grid[sand[1]][sand[0]] === "+") {
      stable++;
      return stable;
    }

    grid[sand[1]][sand[0]] = "o";
    stable++;
    sand = null;
  }
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./14/example.txt");
  const actual = solution(input);
  const expected = 93;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./14/input.txt");
  const actual = solution(input);
  const expected = 24958;
  assertEquals(actual, expected);
});
