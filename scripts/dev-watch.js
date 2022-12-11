const concurrently = require("concurrently");
const { result } = concurrently(
  [
    { command: "npm:watch:ts", name: "tsc", prefixColor: "blue.bold"},
    {
      command: "npm:watch:ts-alias",
      name: "ts-alias",
    },
    {
      command: "npm:watch:node",
      name: "server",
      prefixColor: "green.bold",
    },
  ],
  {
    hide: [1], // hide ts-alias output
    prefix: "[{name} - {pid}]:",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
);
result.then(
  () => {
    console.log("Successfully executed concurrently");
  },
  (err) => console.log("Error executing concurrently: " + err)
);
