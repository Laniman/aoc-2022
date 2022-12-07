import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const getDirFromCd = (dir: { [key: string]: any }, cd: string[]) => {
  return cd.reduce((acc, d) => {
    return acc[d];
  }, dir);
};

function solution(input: string) {
  const lines = input.split("\n");
  const dir = {} as any;
  const cd = [] as string[];

  lines.forEach((line) => {
    const params = line.split(" ");
    if (line.startsWith("$ cd")) {
      const dest = params[2];
      if (dest === "..") {
        cd.pop();
      } else {
        const d = getDirFromCd(dir, cd);
        d[dest] = {};
        cd.push(dest);
      }
    } else if (line.startsWith("$ ls")) {
      // skip
    } else {
      if (params[0] === "dir") {
        const d = getDirFromCd(dir, cd);
        d[params[1]] = {};
      } else {
        const d = getDirFromCd(dir, cd);
        d[params[1]] = Number(params[0]);
      }
    }
  });

  const dirSizes: number[] = [];

  const inner = (d: any) => {
    if (typeof d === "number") {
      return d;
    }

    let s = 0;
    for (const prop in d) {
      s += inner(d[prop]);
    }

    dirSizes.push(s);
    return s;
  };

  inner(dir);

  const sumOfSub100k = dirSizes
    .filter((x) => x <= 100000)
    .reduce((a, b) => a + b);

  return sumOfSub100k;
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./07/example.txt");
  const actual = solution(input);
  const expected = 95437;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./07/input.txt");
  const actual = solution(input);
  const expected = 1723892;
  assertEquals(actual, expected);
});
