// FIXME: implement the required seat assignment logic

const seatRowStructure = [2, 3, 2];

let seats = [];

// function expression to calculate the sum of an array
const calcSum = (array) => array.reduce((a, b) => a + b, 0);

// Main function to find proper seats according to the number of passengers
// Input: number of passengers
// Output: object as follows
// {
//   startRow: the row index of the row which the first passenger will take place ( 1, 2, 3, 4, ...)
//   startSeat: the seat index in the row which the first passenger will take place ( A, B, C, D, ...)
// }
const findProperSeats = (passengerCount) => {
  for (let rowI = 0; rowI < seats.length; rowI++) {
    let row = seats[rowI];
    let sum = 0;
    let sumStartI = 0;
    for (let blockI = 0; blockI < row.length; blockI++) {
      let block = row[blockI];
      if (block === 0) {
        // While adding block size to sum, once it meets block size = 0, it initializes the sum and StartIndex
        // Because the passengers should sit contiguously
        sum = 0;
        sumStartI = blockI + 1;
      }
      if (block === passengerCount) {
        // If any block has the exact number of passengers then this if statement will catch
        seats[rowI][blockI] = 0;
        block = 0;
        const seatIndex = calcSum(seatRowStructure.slice(0, blockI));
        return {
          startRow: rowI,
          startSeat: seatIndex + (seatRowStructure[blockI] - passengerCount),
        };
      }
      sum += block;
      if (sum > passengerCount) {
        // if passengers are able to take place on contiguous block, this if statement will catch
        for (let i = sumStartI; i < blockI; ++i) seats[rowI][i] = 0;
        const previousBlock = seats[rowI][blockI];
        seats[rowI][blockI] = sum - passengerCount;
        return {
          startRow: rowI,
          startSeat:
            calcSum(seatRowStructure.slice(0, sumStartI)) +
            (passengerCount > seatRowStructure[sumStartI]
              ? 0
              : seatRowStructure[sumStartI] - previousBlock),
        };
      }
    }
  }

  // In this case, we couldn't find proper seats so what we need to do is to create new rows in the seats array

  // Number of seats in a row
  const rowSize = calcSum(seatRowStructure);

  // Number of rows in need
  const rowCountInNeed = Math.ceil(passengerCount / rowSize);

  // Check if rowCount is more than 18
  if (seats.length + rowCountInNeed > 18) {
    return {
      startRow: -1,
      startSeat: -1,
    };
  }

  // Add rows to seats array
  addRows(rowCountInNeed);

  let cnt = passengerCount;
  let rowI = seats.length - rowCountInNeed;
  let blockI = 0;
  if (cnt < rowSize) {
    // Check if there is a remaining block which has the number of seats as the same as the number of pasengers
    for (let i = 0; i < seatRowStructure.length; i++) {
      if (seatRowStructure[i] === cnt) {
        seats[rowI][i] = 0;
        return {
          startRow: seats.length - rowCountInNeed,
          startSeat: calcSum(seatRowStructure.slice(0, i)),
        };
      }
    }
  }
  // Remove the taken places in seats array
  while (cnt > seats[rowI][blockI]) {
    cnt -= seats[rowI][blockI];
    seats[rowI][blockI] = 0;
    blockI++;
    if (blockI === seatRowStructure.length) {
      blockI = 0;
      rowI++;
    }
  }
  seats[rowI][blockI] -= cnt;

  return {
    startRow: seats.length - rowCountInNeed,
    startSeat: 0,
  };
};

// Add the number of rows to seats array
const addRows = (rowCount) => {
  while (rowCount--) {
    seats.push([...seatRowStructure]);
  }
};

// Calculate the positions array in string format
const getPositions = (result, passengerCount) => {
  const rowSize = calcSum(seatRowStructure);
  const positions = [];
  let { startRow, startSeat } = result;
  let count = passengerCount;

  // No seats available
  if (startRow === -1 && startSeat === -1) {
    console.log("No seats available");
    return;
  }

  while (count) {
    positions.push(`${startRow + 1}${String.fromCharCode(65 + startSeat)}`);
    if (startSeat >= rowSize - 1) {
      startSeat = 0;
      startRow++;
    } else {
      startSeat++;
    }
    count--;
  }

  console.log(`Seating assignments: ${positions.join(" ")}`);
};

const bogusHardcodedSeatAssigner = (inputStr) => {
  const passengerCount = parseInt(inputStr);
  if (passengerCount >= 0) {
    const res = findProperSeats(passengerCount);
    return getPositions(res, passengerCount);
  } else {
    console.log("Please input correctly.");
  }
};

module.exports = bogusHardcodedSeatAssigner;
