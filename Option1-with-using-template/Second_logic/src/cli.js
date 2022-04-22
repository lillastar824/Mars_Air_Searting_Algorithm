const Readline = require('readline');

const seatAssigner = require('./seatAssigner');

function main() {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "How many passengers in your group? "
  })

  console.log("WELCOME TO MARS AIR SEATING");
  console.log("");

  readline.on('line', inputStr => {
    const seats = seatAssigner(inputStr);
    console.log(`Seating assignments: ${seats.join(" ")}`);
    readline.prompt();
  });

  readline.prompt();
}

module.exports = {
  main
}