document.addEventListener('DOMContentLoaded', function() {

  class Reader {

    bowlingScoresReceiver() {
      let name = [];
      let scores = [];
      let scoresTemp = [];

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
            scoresTemp = text.split(/\n/);
            //check if last line is empty. If yes, parser deleting it.
            if(scoresTemp[scoresTemp.length-1].length === 0) {
              scoresTemp.pop();
            }
            console.log(scoresTemp);

            //segregate datas for names and scores 
            for(let i=0; i<scoresTemp.length; i++) {
              if(i % 2 == 0) {
                name.push(scoresTemp[i]);
              } else {
                scores.push(scoresTemp[i]);
              }
            }
            scoresTemp.length = 0;

            //save scores as 3 nested arrays inside scores array
            scores.forEach(el => {
              scoresTemp.push(el.split(', '));
            })
            scores.length = 0;
            scores = scoresTemp;
          
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

              // creating rows with content
              for (let i = 0; i < name.length; i++) {
                let row = document.createElement('tr');
                let cellName = document.createElement('td');
                cellName.innerHTML = name[i];
                row.appendChild(cellName);
                cellName = document.createElement('td');
                cellName.innerHTML = scores[i].reduce(function (a, b) { return parseFloat(a)+parseFloat(b) });
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
