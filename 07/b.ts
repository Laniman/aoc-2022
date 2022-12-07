import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Dir = {
  [name: string]: number | Dir;
};

const getDirFromCd = (dir: Dir, cd: string[]) => {
  return cd.reduce((acc: Dir, d) => {
    const next = acc[d];
    if (typeof next === "number") {
      throw new Error(`wrong path: ${cd}`);
    }
    return next;
  }, dir);
};

function solution(input: string) {
  const lines = input.split("\n");
  const fs = {};
  const currentDirPath: string[] = [];

  lines.forEach((line) => {
    const params = line.split(" ");

    switch (params[0]) {
      case "$": {
        switch (params[1]) {
          case "cd": {
            const dest = params[2];
            if (dest === "..") {
              currentDirPath.pop();
            } else {
              const dir = getDirFromCd(fs, currentDirPath);
              dir[dest] = {};
              currentDirPath.push(dest);
            }
            break;
          }
          default:
            break;
        }
        break;
      }
      default: {
        if (params[0] === "dir") {
          const dir = getDirFromCd(fs, currentDirPath);
          dir[params[1]] = {};
        } else {
          const dir = getDirFromCd(fs, currentDirPath);
          dir[params[1]] = Number(params[0]);
        }
      }
    }
  });

  const dirSizes: number[] = [];

  const calcFileSize = (current: Dir | number) => {
    if (typeof current === "number") {
      return current;
    }

    let s = 0;
    for (const name in current) {
      s += calcFileSize(current[name]);
    }

    dirSizes.push(s);
    return s;
  };

  const rootSize = calcFileSize(fs);

  const totalSpace = 70_000_000;
  const updateSize = 30_000_000;
  const neededSpace = updateSize - (totalSpace - rootSize);

  const smallestThatFixesSpace = Math.min(
    ...dirSizes.filter((s) => s >= neededSpace),
  );

  return smallestThatFixesSpace;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./07/example.txt");
  const actual = solution(input);
  const expected = 24933642;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./07/input.txt");
  const actual = solution(input);
  const expected = 8474158;
  assertEquals(actual, expected);
});
