 var readline = require('readline');

 var cli = {};

 const getPos = function(i, col) {
   return i+String.fromCharCode(65+col)
 }

 cli.init = function(){
   console.log('\x1b[35m%s\x1b[0m',"Welcome to mars air seating\n");

   var _interface = readline.createInterface({
     input: process.stdin,
     output : process.stdout,
     prompt : '>'
   });

   var arrayOfInputs = [];
   var blockSubSum = [2,5,7]
   var blockPoints = Array(18).fill(0).map((_, id)=>[2,3,2]);
   var lineNo = 0
   var surfaceNo = 0
   var total = 0;
   cli.getUserInput = function(){
    _interface.question("How many passengers in your group? ", function(str){
      arrayOfInputs.push(str);
      const inputNumber = str*1
      var resArr = []
      
      for(var i=surfaceNo; i<=lineNo; i++) {
        if(inputNumber<=3) {
          var equalIndex = blockPoints[i].findIndex(count=>count==inputNumber)
          if(equalIndex<0) {
            if(inputNumber==1) {
              var gapIndex = blockPoints[i].findIndex(count=>count>0)
              resArr.push(getPos(i+1, blockSubSum[i]-blockPoints[i][gapIndex]))
              blockPoints[i][gapIndex] -=1
              break
            } else if(i==lineNo) {
              lineNo++
              Array(blockPoints[lineNo][inputNumber%2]).fill(0).forEach((_, id)=>{
                resArr.push(getPos(lineNo+1, blockSubSum[inputNumber%2]-blockPoints[lineNo][inputNumber%2]+id))
              })
              blockPoints[lineNo][inputNumber%2] = 0
              break
            }
            // blockPoints[i] = 0
          } else {
            Array(blockPoints[i][equalIndex]).fill(0).forEach((_, id)=>{
              resArr.push(getPos(i+1, blockSubSum[equalIndex]-blockPoints[i][equalIndex]+id))
            })
            blockPoints[i][equalIndex] = 0
            // blockPoints[i] = 0
            break
          }
        } else if(inputNumber<=7) {
          if((blockPoints[i][0] + blockPoints[i][1] + blockPoints[i][2]) >= inputNumber) {
            Array(inputNumber).fill(0).forEach((_, id)=>{
              resArr.push(getPos(i+1, 5-(blockPoints[i][0] + blockPoints[i][1])+id))
            })
            var temp = inputNumber - blockPoints[i][0]
            blockPoints[i][0] = 0
            temp = temp>=blockPoints[i][1]?temp-blockPoints[i][1]:0
            blockPoints[i][1] = temp>=0?0:-temp
            blockPoints[i][2] = blockPoints[i][2] - temp
            break
          } else if(i==lineNo) {
            lineNo++
            var temp = inputNumber
            blockPoints[lineNo][0] = 0
            blockPoints[lineNo][1] = temp>=blockPoints[lineNo][1]?0:blockPoints[lineNo][1]-temp
            temp = temp>blockPoints[lineNo][1]?temp-blockPoints[lineNo][1]:0
            blockPoints[lineNo][2] = blockPoints[lineNo][2] - temp
            Array(inputNumber).fill(0).forEach((_, id)=>{
              resArr.push(getPos(lineNo+1, id))
            })
            break
          }
        } else {
          const divCount = Math.ceil(inputNumber/7)
          for(var j=0; j<divCount-1; j++){
            if(arrayOfInputs.length>1)
              lineNo++
            blockPoints[lineNo][0] = 0
            blockPoints[lineNo][1] = 0
            blockPoints[lineNo][2] = 0
            Array(7).fill(0).forEach((_, id)=>{
              resArr.push(getPos(lineNo+1, id))
            })
          }
          lineNo++
          var temp = inputNumber%7
          blockPoints[lineNo][0] = temp>=blockPoints[lineNo][0]?0:blockPoints[lineNo][0]-temp
          temp = temp>blockPoints[lineNo][0]?temp-blockPoints[lineNo][0]:0
          blockPoints[lineNo][1] = temp>=blockPoints[lineNo][1]?0:blockPoints[lineNo][1]-temp
          temp = temp>blockPoints[lineNo][1]?temp-blockPoints[lineNo][1]:0
          blockPoints[lineNo][2] = blockPoints[lineNo][2] - temp
          Array(inputNumber%7).fill(0).forEach((_, id)=>{
            resArr.push(getPos(lineNo+1, id))
          })
          break
        }
      }
      if(blockPoints[surfaceNo][0]+blockPoints[surfaceNo][1]+blockPoints[surfaceNo][2]==7)
        surfaceNo++
      const result = resArr.join(' ')
      console.log(`Seating assignments: ${result}\n`);
      cli.getUserInput();
    });
   };

   cli.getUserInput();

 };

 cli.init();