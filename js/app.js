document.addEventListener('DOMContentLoaded', function() {

  class Reader {

    bowlingScoresReceiver() {
      let name = [];
      let scores = [];
      let scoresTemporary = [];

      //make an input element to receive the file 
      let input = document.createElement('input'); 
      input.classList.add('fileInput');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', '.txt');
      document.getElementById('app').appendChild(input);
      input.innerHTML = 'Wybierz plik';

      document.querySelector('.fileInput').addEventListener('change', readFile); 
      //receive data from file
      
      function readFile (e) { 
          let files = e.target.files;
          let file = files[0];           
          let reader = new FileReader();

          //organize received datas to auxiliary arrays
          reader.onload = function(event) {
            let text = event.target.result;

            // make new lines from text and put into temporary array
            scoresTemporary = text.split(/\n/);

            //check if last line is empty. If yes, parser deleting it.
            if(scoresTemporary[scoresTemporary.length-1].length === 0) {
              scoresTemporary.pop();

            }

            //segregate datas for names and scores 
            for(let i=0; i<scoresTemporary.length; i++) {
              if(i % 2 == 0) {
                name.push(scoresTemporary[i]);
              } else {
                scores.push(scoresTemporary[i]);
              }
            }
            scoresTemporary.length = 0;

            //save scores as 3 nested arrays inside scores array
            scores.forEach(el => {
              scoresTemporary.push(el.split(', '));
            })
            scores.length = 0;
            scores = scoresTemporary;
          
            drawTable();
            // creates a table element
            function drawTable() {
              let table = document.createElement('table');

              //create thead element with description of each column
              let thead = document.createElement('tr');
              let tcell = document.createElement('th');
              tcell.innerHTML = 'Person';
              thead.appendChild(tcell);
              tcell = document.createElement('th');
              tcell.innerHTML = 'Sum';
              thead.appendChild(tcell);
              let longest = scores.reduce(function (a, b) { return a.length > b.length ? a : b });
              for (let i=1; i<(longest.length+1); i++) {
                let cell = document.createElement('th');
                cell.innerHTML = i;
                thead.appendChild(cell);
              }
              table.appendChild(thead);
              let temporaryArray = [];
              // creating rows with content
              for (let i = 0; i < name.length; i++) {
                let row = document.createElement('tr');
                let cellName = document.createElement('td');
                cellName.innerHTML = name[i];
                row.appendChild(cellName);
                cellName = document.createElement('td');
                
                for(let j=0; j<scores[i].length; j++) { //iterate throw each array to the end
                  
                  if(parseFloat(scores[i][j]) === 10) { //if parser find 10 value
                    if (scores[i][j+2] === undefined) { //if parser find 10 value and thi is not closer than 2 positions from the end
                      temporaryArray.push(parseFloat(scores[i][j]));
                      temporaryArray.push(parseFloat(scores[i][j+1]));
                      j++;
                    } else if (scores[i][j+1] === undefined) { //if parser find 10 value and thi is not closer than 1 positions from the end
                      temporaryArray.push(parseFloat(scores[i][j]));
                      j++;
                    } else {
                      let temp = parseFloat(scores[i][j]) + parseFloat(scores[i][j+1]) + parseFloat(scores[i][j+2]);
                      temporaryArray.push(temp);
                    }
                    

                  } else if (parseFloat(scores[i][j-1]) === 10 && parseFloat(scores[i][j]) !== 10) { //if next element after 10 value is not 10 value 
                    for(let k=j; k<scores[i].length; k++) { //new loop started from actual position of first loop 
                      if ((parseFloat(scores[i][k]) + parseFloat(scores[i][k+1])) === 10) { 
                        j++; //iterate j variable from main loop to stop all loops when program finish array
                        if (scores[i][k+3] === undefined) {
                          
                          let temp = parseFloat(scores[i][k]) + parseFloat(scores[i][k+1]);
                          temporaryArray.push(temp);
                          j++, k++;
                        } else {
                          let temp = parseFloat(scores[i][k]) + parseFloat(scores[i][k+1]) + parseFloat(scores[i][k+2]);
                          temporaryArray.push(temp);
                          j++, k++;
                        }
                      } else {
                        temporaryArray.push(parseFloat(scores[i][k]));
                        j++;
                      } 
                    } 

                    
                   
                  } else if ((parseFloat(scores[i][j]) + parseFloat(scores[i][j+1])) === 10 &&  j%2 === 0) { //if sum of two throws from one round is equal 10
                    if (scores[i][j+3] === undefined) {
                      let temp = parseFloat(scores[i][j]) + parseFloat(scores[i][j+1]);
                      temporaryArray.push(temp);
                      j++;
                    } else {
                      let temp = parseFloat(scores[i][j]) + parseFloat(scores[i][j+1]) + parseFloat(scores[i][j+2]);
                      temporaryArray.push(temp);
                      j++;
                    }
                    
                  } else { //other case, just enter value to sum
                    temporaryArray.push(parseFloat(scores[i][j]));
                  }  
                  
                }

                cellName.innerHTML = temporaryArray.reduce(function (a, b) { return parseFloat(a)+parseFloat(b) });
                temporaryArray.length = 0;
                row.appendChild(cellName);

                // create cells in row with content
                for (let j = 0; j < scores[i].length; j++) {
                  let cell = document.createElement('td');
                  if(scores[i][j] === undefined) {
                    cell.innerHTML = null;
                  } else {
                    cell.innerHTML = scores[i][j];
                  }
                  row.appendChild(cell);         
                } 
              
              // add the row to the end of the table body
              table.appendChild(row); 
              }
            // appends table into app
            document.getElementById('app').appendChild(table);
            }   
          }
        reader.readAsText(file);
      }
    }
  
  }
  let fileReader = new Reader();
  fileReader.bowlingScoresReceiver();
});
