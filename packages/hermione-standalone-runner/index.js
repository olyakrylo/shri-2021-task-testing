const { spawn } = require("child_process");
const fs = require("fs").promises;
const delay = require("delay");

module.exports = (hermione) => {
  let selenium;
  hermione.on(hermione.events.RUNNER_START, async () => {
    const file = await fs.open("selenium.log", "w");

    selenium = spawn("selenium-standalone", ["start"], {
      stdio: ["ignore", file, file],
    });

    selenium.on("spawn", () => {
      console.log("Selenium server started")
    });

    await delay(5000);
  });

  hermione.on(hermione.events.RUNNER_END, () => {
    return new Promise((resolve) => {
      selenium.on("exit", () => resolve());
      selenium.kill();
    });
  });
}
