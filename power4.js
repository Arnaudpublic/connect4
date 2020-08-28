let game_over,amount_of_turns_played = 0;

//Lot of this code was directly copied from my OXO files
//There is a lot of similarities between the 2 games so I used a similar process

let rows,columns,amount_of_box_wanted,treshold_wanted;
let column_number,row_number,box_to_change_color;

let player = "x";
let board_generated = false;

function change_background(column) {
	//console.log(column.getElementsByClassName("unoccupied").length)
	box_to_change_color = column.getElementsByClassName("unoccupied").length - 1
	column.getElementsByClassName("unoccupied")[box_to_change_color].style.backgroundColor = "purple";
}

function change_background_back(column) {
	//console.log(column.getElementsByClassName("unoccupied").length)
	box_to_change_color = column.getElementsByClassName("unoccupied").length - 1
	column.getElementsByClassName("unoccupied")[box_to_change_color].style.backgroundColor = "rgb(0, 0, 0, 0)";
}

function board() {
	if (board_generated==true) {
		if(confirm("This will erase the current ongoing game. Are you sure?")) {
			amount_of_turns_played = 0
			grid_html = document.getElementById("full_grid")
			for (var i = grid_html.getElementsByClassName("column").length - 1; i >= 0; i--) {
				remove_box = grid_html.getElementsByClassName("column")[i]
				remove_box.remove()
    			document.getElementById("full_grid").style.gridTemplateColumns = "1fr 1fr 1fr";
			}
			document.getElementById("full_grid").style.backgroundColor = "rgb(0, 0, 0,0.7)"
			game_over = false
		} else {
			return
		}
	} 
	board_generated = true
	rows = Number(document.getElementById("rows_wanted").value)
	columns = Number(document.getElementById("columns_wanted").value)
	treshold_wanted = Number(document.getElementById("threshold_wanted").value)
    document.getElementById("full_grid").style.gridTemplateColumns += "1fr 1fr 1fr";
	for (var i = 0; i < columns-3; i++) {
		//console.log("+1")
    	document.getElementById("full_grid").style.gridTemplateColumns += " 1fr";
    	//console.log(document.getElementById("full_grid").style.gridTemplateColumns)
	}
	amount_of_box_wanted = columns*rows;
	boxes = new Array(columns)
	for (var i = boxes.length - 1; i >= 0; i--) {
		boxes[i] = new Array(rows)
	}


	for (column_number = 1; column_number <= columns; column_number++) {
		let column_creation = document.createElement('div');
		//console.log(paragraph_creation)
		// add classes to div, a text, etc.
		// ...
		column_creation.title = column_number;
		column_creation.className = "column";
		column_creation.addEventListener("click", 
			function(){
				play(this)
			});
		column_creation.addEventListener("mouseover", 
			function(){
				change_background(this)
			});
		column_creation.addEventListener("mouseout", 
			function(){
				change_background_back(this)
			});
		for (var row_number = 1; row_number <= rows; row_number++) {
			rows[i]
			//<div class="case unoccupied" title="1">
			//	<img src=https://bit.ly/white_connect_4 class="image"></img>
			//</div>
			let box_creation = document.createElement('div');
			box_creation.className = "case unoccupied";
			box_creation.title = row_number;
			let image_creation = document.createElement('img');
			image_creation.src = "https://bit.ly/white_connect_4";
			image_creation.className = "image";
			box_creation.appendChild(image_creation);
			column_creation.appendChild(box_creation);
		}
		// then add a DIV to the DOM
		document.getElementById("full_grid").appendChild(column_creation);
	}
	for (var j = 0; j < document.getElementsByClassName("column").length; j++) {
			document.getElementsByClassName("column")[j].style.gridTemplateRows += "1fr 1fr 1fr";
		}

	for (var i = 0; i < rows - 3; i++) {
		//console.log("+1")
		for (var j = 0; j < document.getElementsByClassName("column").length; j++) {
			document.getElementsByClassName("column")[j].style.gridTemplateRows += " 1fr";
			//console.log("La colonne " + j + " a augmentée son fr de 1")
		}
    	//document.getElementsByClassName("column")[0].style.gridTemplateRows += " 1fr"; // add one for >3
    	//console.log(document.getElementsByClassName("column")[0].style.gridTemplateRows)
	}
}

function play(column) {
  //let column = e.target
	if (game_over==true) {
		alert("The game is over, refresh to replay")
		return
	}
	console.log(column)
	if ((column.getElementsByClassName("unoccupied")[box_to_change_color].innerText !== "")&&(column.getElementsByClassName("unoccupied")[box_to_change_color].innerText !== undefined)) { // to fix
		//console.log("Invalid data")
		alert("This column is already full. Please pick a column that isn't totally filled.")
	} else {
		//number = column.title // it's actually useless because I use columns
		box_to_change_color = column.getElementsByClassName("unoccupied").length - 1
		if (player == "red") {
			document.getElementById('whose_turn').innerText = "Red is currently playing"
			player = "blue";
			column.getElementsByClassName("unoccupied")[box_to_change_color].getElementsByClassName("image")[0].src = "https://bit.ly/blue_connect_4"
		} else {
			document.getElementById('whose_turn').innerText = "Blue is currently playing"
			player = "red";
			column.getElementsByClassName("unoccupied")[box_to_change_color].getElementsByClassName("image")[0].src = "https://bit.ly/red_connect_4"
		}
		column_number = column.title - 1
		row_number = column.getElementsByClassName("unoccupied")[box_to_change_color].title - 1
		boxes[column_number][row_number] = player; // changing on the variables
		amount_of_turns_played++ // for tie check
		//column.getElementsByClassName("unoccupied")[box_to_change_color].innerText = "O" // changing on the grid
		//column.getElementsByClassName("unoccupied")[box_to_change_color].style.color = player;
		column.getElementsByClassName("unoccupied")[box_to_change_color].style.backgroundColor = "rgb(0, 0, 0, 0)";
		column.getElementsByClassName("unoccupied")[box_to_change_color].classList.remove("unoccupied")
	 }
	 //console.log(typeof(row_number),typeof(actual_treshold),typeof(row_number+actual_treshold))
	 if (win_conditions()==true) {
	 	console.log("Game over")
		document.getElementById("full_grid").style.backgroundColor = "rgb(100, 0, 0,0.5)"
		document.getElementById('whose_turn').innerText = "The game is over!"
		game_over = true
	 }
}


function win_conditions() {
	console.log(boxes)
	//vertical
	for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each column
		//console.log(boxes[row_number])
		for (row_number = 0; row_number <= boxes.length - 1; row_number++) { 
			actual_treshold = 0
			interrupted = false
			while ((treshold_wanted>actual_treshold)&&(interrupted==false)) { // we want to hit a certain treshold given
				if ((boxes[column_number][row_number]==boxes[column_number][row_number+actual_treshold])&&(boxes[column_number][row_number]!==undefined)) 
				{
					actual_treshold++
					//console.log("treshold is now = "+ actual_treshold)
				} else {
					interrupted = true
					//console.log("Treshold interrupted")
				}
			if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[column_number][row_number] + " won")
				return true
				}
			}
		}
	}
	//diagonal from left above to right bottom
	for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each column
		for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (column_number*3+row_number))
			//console.log(boxes[column_number][row_number])
			actual_treshold = 0
			interrupted = false
			if (boxes[column_number][row_number]==undefined) {
				//console.log("Colonne: " + column_number, "Ligne: " + row_number)
				//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[column_number+actual_treshold]!==undefined) { 
				console.log("Colonne: " + column_number, "Ligne: " + row_number)
					if ((boxes[column_number][row_number]==boxes[column_number+actual_treshold][row_number+actual_treshold])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted (" + actual_treshold + ")")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[column_number][row_number] + " won")
				return true
				}
			}
		}
	}
	//diagonal from left bottom to right above
	for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each column
		for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (row_number*columns+column_number))
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			if ((boxes[column_number][row_number]==undefined)) {
					//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[column_number+actual_treshold]!==undefined) { 
					if ((boxes[column_number][row_number]==boxes[column_number+actual_treshold][row_number-actual_treshold])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[column_number][row_number] + " won")
				return true
				}
			}
		}
	}
	//horizental
	for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each column
		for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (row_number*columns+column_number))
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			if ((boxes[column_number][row_number]==undefined)) {
					//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[column_number+actual_treshold]!==undefined) { 
					if ((boxes[column_number][row_number]==boxes[column_number+actual_treshold][row_number])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[column_number][row_number] + " won")
				return true
				}
			}
		}
	}
	//tie detector
	if (amount_of_box_wanted==amount_of_turns_played) {
		alert("It's a tie, all boxes are occupied but nobody won!")
		return true
	}
}

