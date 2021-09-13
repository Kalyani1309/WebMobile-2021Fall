let ai_choice = 0,
    user_choice = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    /* Retrieves the dividers from the document that will be manipulated */
    const messages = document.getElementById("rps_messages");
    const buttons = document.getElementById("rps_buttons");

    startScreen();

    /* Resets the game */
    function reset() {
        console.log("Resetting game");
        ai_choice = 0;
        user_choice = 0;

        startScreen();
    }

    /* Runs the logic for the game */
    function determineResult(user_selection) {
        console.log("User entered " + user_selection);

        /* AI selection */
        const choices = ["Rock", "Paper", "Scissors"];
        ai_choice = choices[Math.floor(Math.random() * 3)];
        user_choice = user_selection;

        console.log("AI choice " + ai_choice);

        /* Handle invalid user selection */
        if(user_choice === 0) {
            console.log("User has not selected an option, resetting");
            reset();
        }
        /* Logic for the game */
        else {
            if(user_choice === ai_choice) {
                endScreen("Tied");
            }
            else if(user_choice === "Rock") {
                if(ai_choice === "Scissors") {
                    endScreen("Win");
                } else {
                    endScreen("Lose");
                }
            }
            else if(user_choice === "Paper") {
                if(ai_choice === "Rock") {
                    endScreen("Win");
                } else {
                    endScreen("Lose");
                }
            }
            else if(user_choice === "Scissors"){
                if(ai_choice === "Paper") {
                    endScreen("Win");
                } else {
                    endScreen("Lose");
                }
            }
            /* Default error handler */
            else {
                console.log("Invalid Option, resetting");
                reset();
            }
        }
    }

    /* Creates the Start Screen */
    function startScreen() {
        console.log("Creating Start Screen");

        /* Clear previous elements */
        messages.innerHTML = "";
        buttons.innerHTML = "";

        /* Create Rock, Paper, Scissors Buttons */
        let rock_button = document.createElement("BUTTON");
        let paper_button = document.createElement("BUTTON");
        let scissors_button = document.createElement("BUTTON");

        rock_button.className = "TransparentButton";
        rock_button.innerHTML = '<img src="Rock.png" width="67" height="68" alt="Rock">';
        rock_button.onclick = function(){ determineResult("Rock"); };

        paper_button.className = "TransparentButton";
        paper_button.innerHTML = '<img src="Paper.png" width="67" height="68" alt="Paper">';
        paper_button.onclick = function(){ determineResult("Paper"); };

        scissors_button.className = "TransparentButton";
        scissors_button.innerHTML = '<img src="Scissors.png" width="67" height="68" alt="Scissors">';
        scissors_button.onclick = function(){ determineResult("Scissors"); };

        /* Create Instructions */
        let welcome_message = document.createElement("H1");
        welcome_message.innerText = "Please select either Rock, Paper or Scissors";

        /* Create Grid Layout */
        let row1 = document.createElement("DIV");
        let row2 = document.createElement("DIV");
        let col1 = document.createElement("DIV");
        let col2 = document.createElement("DIV");
        let col3 = document.createElement("DIV");
        let col4 = document.createElement("DIV");
        row1.className = "row mt-2";
        row2.className = "row mt-5";
        col1.className = "col text-center";
        col2.className = "col-2 offset-3 text-center";
        col3.className = "col-2 text-center";
        col4.className = "col-2 text-center";

        col1.appendChild(welcome_message);
        col2.appendChild(rock_button);
        col3.appendChild(paper_button);
        col4.appendChild(scissors_button);

        row1.appendChild(col1);
        row2.appendChild(col2);
        row2.appendChild(col3);
        row2.appendChild(col4);

        messages.appendChild(row1);
        buttons.appendChild(row2);
    }

    function endScreen(result) {
        // Clear existing elements
        messages.innerHTML = "";
        buttons.innerHTML = "";

        /* Create element to display the results of the game */
        let result_message = document.createElement("H1");
        result_message.innerText = "You " + result;

        let user_message = document.createElement("H2");
        user_message.innerText = "You selected:";

        let ai_message = document.createElement("H2");
        ai_message.innerText = "AI selected:";

        let user_Img = document.createElement("IMG");
        user_Img.src = user_choice + ".png";
        user_Img.width = "67";
        user_Img.height = "68";
        user_Img.alt = user_choice;

        let ai_Img = document.createElement("IMG");
        ai_Img.src = ai_choice + ".png";
        ai_Img.width = "67";
        ai_Img.height = "68";
        ai_Img.alt = ai_choice;

        let reset_button = document.createElement("BUTTON");
        reset_button.className = "btn btn-primary";
        reset_button.innerText = "Play Again";
        reset_button.onclick = function(){ reset(); };

        // Setup grid layout
        let row1 = document.createElement("DIV");
        let row2 = document.createElement("DIV");
        let row3 = document.createElement("DIV");
        row1.className = "row mt-2";
        row2.className = "row mt-2";
        row3.className = "row mt-5";

        let col1 = document.createElement("DIV");
        let col2 = document.createElement("DIV");
        let col3 = document.createElement("DIV");
        let col4 = document.createElement("DIV");
        col1.className = "col text-center";
        col2.className = "col text-center";
        col3.className = "col text-center";
        col4.className = "col text-center";

        col1.appendChild(result_message);
        col2.appendChild(user_message);
        col2.appendChild(user_Img);
        col3.appendChild(ai_message);
        col3.appendChild(ai_Img);
        col4.appendChild(reset_button);

        row1.appendChild(col1);
        row2.appendChild(col2);
        row2.appendChild(col3);
        row3.appendChild(col4);

        messages.appendChild(row1);
        messages.appendChild(row2);
        buttons.appendChild(row3);
    }
});