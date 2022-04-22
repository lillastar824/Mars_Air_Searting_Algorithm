let seats = [];
let availability = [];
const rows = 18;
const rowCapacity = 7;

function initialize() {
    let i = 0;
    while (i < rows) {
      let j = 0;
      seats.push([]);
      availability.push([]);
      while (j < rowCapacity) {
        seats[i].push(i+1 + String.fromCharCode(65+j));
        availability[i].push(1);
        j++;
      }
      i++;
    }
}

function availableSeats(s) {
  let sum = 0;
  if (s) {
    s.forEach(avail => {
      sum += avail;
    });
  }
  return sum;
}

function assignSeats(n) {
  let i = 0;
  let assignedSeats = [];
  let rightSide = false;
  availability.forEach((row, ri)=>{
    row.forEach((seat, si)=>{
      if (seat && (i < n)) {
        if (n == 1) {
          assignedSeats.push(seats[ri][si]);
          availability[ri][si] = 0;
          i++;
        } else if (n == 2) {
          if ((i == si) || (i+5 == si)) {
            assignedSeats.push(seats[ri][si]);
            availability[ri][si] = 0;
            i++;
          }
        } else if ((n == 3) && (si > 1) && (si < 5) && (availableSeats(row)+i >= 3)) {
          assignedSeats.push(seats[ri][si]);
          availability[ri][si] = 0;
          i++;
        } else if ((n >= 4) && (availableSeats(row)+i > 1)) {
          assignedSeats.push(seats[ri][si]);
          availability[ri][si] = 0;
          i++;
        }
      }
    });
  });
  return assignedSeats;
}


module.exports = assignSeats;
initialize();