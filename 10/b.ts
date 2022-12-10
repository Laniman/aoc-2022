import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function solution(input: string) {
  const lines = input.split("\n");

  const ops = [];
  let valueOfRegister = 1;

  for (let i = 0; i < lines.length; i++) {
    ops.push(0);
    const [command, arg] = lines[i].split(" ");

    if (command === "addx") {
      ops.push(Number(arg));
    }
  }

  const image = Array.from(
    { length: 6 },
    () => Array.from({ length: 40 }, () => "."),
  );

  ops.forEach((n, index) => {
    const [x, y] = [index % 40, Math.floor(index / 40)];

    const havePixel = x === (valueOfRegister - 1) || x === valueOfRegister ||
      x === (valueOfRegister + 1);

    if (havePixel) {
      image[y][x] = "#";
    }

    valueOfRegister += n;
  });

  return image.map((line) => line.join("")).join("\n");
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./10/example.txt");
  const actual = solution(input);
  const expected = "##..##..##..##..##..##..##..##..##..##..\n" +
    "###...###...###...###...###...###...###.\n" +
    "####....####....####....####....####....\n" +
    "#####.....#####.....#####.....#####.....\n" +
    "######......######......######......####\n" +
    "#######.......#######.......#######.....";
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./10/input.txt");
  const actual = solution(input);
  const expected = "####.#..#.###..####.###....##..##..#....\n" +
    "#....#..#.#..#....#.#..#....#.#..#.#....\n" +
    "###..####.#..#...#..#..#....#.#....#....\n" +
    "#....#..#.###...#...###.....#.#.##.#....\n" +
    "#....#..#.#....#....#....#..#.#..#.#....\n" +
    "####.#..#.#....####.#.....##...###.####.";
  assertEquals(actual, expected);
});
