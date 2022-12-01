Deno.chdir("./01");

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

const totals = lines.map((line) => {
  return line.split("\n").reduce((acc, item) => acc + Number(item), 0);
});

const max = Math.max(...totals);

console.log(max);
