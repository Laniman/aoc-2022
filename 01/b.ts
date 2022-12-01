Deno.chdir("./01");

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

const totals = lines.map((line) => {
  return line.split("\n").reduce((acc, item) => acc + Number(item), 0);
});

const sumOfTop3 = totals
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, el) => acc + el);

console.log(sumOfTop3);
