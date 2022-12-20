import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Point = { x: number; y: number };
type Rock = Point[];

const rocks: Rock[] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
];

const isInXBounds = (rock: Rock, dx: number) => {
  return rock.every((point) => {
    const next = point.x + dx;
    return next >= 0 && next <= 6;
  });
};

const hasCollision = (
  rock: Rock,
  ground: Set<Point>,
  dx: number,
  dy: number,
) => {
  return rock.some((point) => {
    const nextX = point.x + dx;
    const nextY = point.y + dy;
    let result = false;
    for (const { x, y } of ground) {
      if (x === nextX && y === nextY) {
        result = true;
      }
    }
    return result;
  });
};

const parseInputDirection = (input: string) => {
  switch (input) {
    case "<":
      return -1;
    case ">":
      return 1;
    default:
      throw new Error(`Invalid input: ${input}`);
  }
};

const moveX = (rock: Rock, dx: number) => {
  rock.forEach((point) => {
    point.x += dx;
  });
};

const moveY = (rock: Rock, dy: number) => {
  rock.forEach((point) => {
    point.y += dy;
  });
};

const cleanGround = (ground: Set<Point>, top: number) => {
  const forRemove = [];
  for (const point of ground) {
    if (point.y < top - 100) {
      forRemove.push(point);
    }
  }
  forRemove.forEach((point) => {
    ground.delete(point);
  });
};

function solution(input: string) {
  const ground = new Set<Point>(
    Array.from({ length: 7 }, (_, x) => ({ x, y: 0 })),
  );
  let rockIndex = -1;
  let directionIndex = -1;
  let highestY = 0;

  while (true) {
    rockIndex++;
    const abstractRock = rocks[rockIndex % rocks.length];
    const rock = JSON.parse(JSON.stringify(abstractRock)) as Rock;

    rock.forEach((point) => {
      point.x += 2;
      point.y += highestY + 4;
    });

    while (true) {
      directionIndex++;
      const direction = parseInputDirection(
        input[directionIndex % input.length],
      );

      if (
        isInXBounds(rock, direction) &&
        !hasCollision(rock, ground, direction, 0)
      ) {
        moveX(rock, direction);
      }

      if (hasCollision(rock, ground, 0, -1)) {
        break;
      }

      moveY(rock, -1);
    }

    rock.forEach((point) => {
      ground.add(point);
    });
    highestY = Math.max(...rock.map(({ y }) => y), highestY);
    cleanGround(ground, highestY);

    if (rockIndex === 2021) {
      return highestY;
    }
  }
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./17/example.txt");
  const actual = solution(input);
  const expected = 3068;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./17/input.txt");
  const actual = solution(input);
  const expected = 3085;
  assertEquals(actual, expected);
});
