import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Resources = [number, number, number, number];
type Bots = [number, number, number, number];

const calculateGeodes = (blueprint: number[], time: number) => {
  const [
    _blueprintId,
    oreBotOreCost,
    clayBotOreCost,
    obsBotOreCost,
    obsBotClayCost,
    geodeBotOreCost,
    geodeBotObsCost,
  ] = blueprint;

  const maxOreCost = Math.max(
    oreBotOreCost,
    clayBotOreCost,
    obsBotOreCost,
    geodeBotOreCost,
  );

  let totalGeodes = 0;

  const inner = (remainingTime: number, resources: Resources, bots: Bots) => {
    const idleGeodes = resources[3] + bots[3] * remainingTime;
    if (idleGeodes > totalGeodes) {
      totalGeodes = idleGeodes;
    }
    const optimalGeodes = idleGeodes +
      remainingTime * (Math.ceil(remainingTime - 1) / 2);

    if (optimalGeodes <= totalGeodes) {
      return;
    }

    const turnsForCost = (botCost: [number, number, number, number]) => {
      const turns: (number | null)[] = [];
      for (let i = 0; i < botCost.length; i++) {
        const r = resources[i];
        const b = bots[i];
        const c = botCost[i];
        if (r >= c) {
          turns.push(0);
        } else if (b) {
          turns.push(Math.ceil((c - r) / b));
        } else {
          turns.push(null);
        }
      }

      if (turns.every((el) => el !== null)) {
        return Math.max(...(turns as number[]));
      } else {
        return null;
      }
    };

    const botCosts: [number, number, number, number][] = [
      [oreBotOreCost, 0, 0, 0],
      [clayBotOreCost, 0, 0, 0],
      [obsBotOreCost, obsBotClayCost, 0, 0],
      [geodeBotOreCost, 0, geodeBotObsCost, 0],
    ];

    botCosts.forEach((cost, i) => {
      if (i === 0 && bots[i] >= maxOreCost) return;
      if (i === 1 && bots[i] >= obsBotClayCost) return;
      if (i === 2 && bots[i] >= geodeBotObsCost) return;
      const turns = turnsForCost(cost);
      if (turns !== null && turns < remainingTime) {
        const nextBots = bots.slice() as typeof bots;
        nextBots[i] += 1;
        const producedResources = bots.map((bot) => bot * (turns + 1));
        const nextResources = resources.map(
          (resource, i) => resource + producedResources[i] - cost[i],
        ) as typeof resources;
        inner(remainingTime - turns - 1, nextResources, nextBots);
      }
    });
  };

  inner(time, [0, 0, 0, 0], [1, 0, 0, 0]);
  return totalGeodes;
};

function solution(input: string): number {
  const blueprints = input
    .split("\n")
    .map((line) => line.match(/\d+/g)!.map((n) => Number(n)));

  return blueprints
    .slice(0, 3)
    .reduce((acc, blueprint) => acc * calculateGeodes(blueprint, 32), 1);
}

Deno.test("example", () => {
  const input = Deno.readTextFileSync("./19/example.txt");
  const actual = solution(input);
  const expected = 3472;
  assertEquals(actual, expected);
});

Deno.test("puzzle input", { ignore: false }, () => {
  const input = Deno.readTextFileSync("./19/input.txt");
  const actual = solution(input);
  const expected = 4114;
  assertEquals(actual, expected);
});
