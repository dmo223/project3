/*
 * This files holds all the code to for your card game
 */

//Run once broswer has loaded everything
window.onload = function () {
    // Get the modals
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");

    //Element that closes the modal and starts the game
    var dealBtn = document.getElementById("deal");

    //Element that closes the modal and restart the game
    var resetBtn = document.getElementById("reset");

    // Open the starting modal
    modal.style.display = "block";

    // When the user clicks on the deal button, close the modal
    dealBtn.onclick = function () {
    modal.style.display = "none";
    };

    //Getting and setting the deck id, using six decks
    var deckId = "";

    //player and dealer info
    var playerHand = [];
    var playerScore = 0;
    var dealerHand = [];
    var dealerScore = 0;

    //when the game starts
    dealBtn.addEventListener("click", function () {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
        .then(result => result.json())
        .then(function (json) {
        //gets the deck id from the deck that is created
        deckId = json.deck_id;
        //draws the four starting cards and adds them to the player and dealer's hands
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(result => result.json())
            .then(function (json) {
            dealerHand.push(json.cards[0]);
            dealerHand.push(json.cards[1]);
            playerHand.push(json.cards[2]);
            playerHand.push(json.cards[3]);
            })
            //adds the card images and scores to the board
            .then(function () {
            //hides the dealer's first card
            document.getElementById("dealer1").src = "https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218.jpg";

            document.getElementById("dealer2").src = dealerHand[1].image;

            dealerScore += score(dealerHand[1].value, dealerHand[1].code);

            document.getElementById("dealerScore").innerHTML = dealerScore;

            document.getElementById("player1").src = playerHand[0].image;
            playerScore += score(playerHand[0].value, playerHand[0].code);
            document.getElementById("playerScore").innerHTML = playerScore;

            document.getElementById("player2").src = playerHand[1].image;
            playerScore += score(playerHand[1].value, playerHand[0].code);
            document.getElementById("playerScore").innerHTML = playerScore;

            if(playerScore==21){
            
                document.getElementById("playerScore").innerHTML = "BLACKJACK";

                //display ending modal and restart the game
                document.getElemenetById("end").innerHTML = "Player Wins";
                reset();
            }
            });
        });
    });

    //Calculates the value of each card
    function score(value, code) {
    let score = 0;

    //arrays for the card codes in each hand
    let playerCards = playerHand.map(x => x.code);
    let dealerCards = dealerHand.map(x => x.code);

    //if the card value is a number, the card score is that number
    if (!isNaN(parseInt(value))) {
        score = parseInt(value);
    }
    //if the card is an ace, the value is 1 or 11 depending on the score of the hand
    else if (value == "ACE") {
        if ((playerCards.includes(code) && playerScore < 11) || (dealerCards.includes(code) && dealerScore < 11)) {
        score = 11;
        }
        else {
        score = 1;
        }
    }
    //if the card is a face card, the value is 10
    else {
        score = 10;
    }
    return score;
    }

    var hitBtn = document.getElementById("hit");

    hitBtn.onclick = function () {
    //draw one card when the player clicks the hit button
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(result => result.json())
        .then(function (json) {
        //creates an img tag to display the card drawn
        let card = document.createElement("img");
        //the div where the img tag will be added
        let hand = document.getElementById("playerHand");
        //sets the class to cards
        card.className = "cards";
        card.alt = "extra cards";
        //adds the card img to the tag
        card.src = json.cards[0].image;
        //adds the image to the div
        hand.appendChild(card);
        //updates the players score
        playerScore += score(json.cards[0].value, json.cards[0].code);
        document.getElementById("playerScore").innerHTML = playerScore;

        //if the player busts
        if (playerScore > 21) {
            document.getElementById("playerScore").innerHTML = "BUST";

            //reveal the dealer's hand
            document.getElementById("dealer1").src = dealerHand[0].image;
            //update the dealer's score
            dealerScore += score(dealerHand[0].value, dealerHand[0].code);
            document.getElementById("dealerScore").innerHTML = dealerScore;

            //display the ending modal and restart the game
            document.getElementById("end").innerHTML = "Dealer Wins";
            reset();
        }
        //if the player gets Blackjack
        if (playerScore == 21) {
            document.getElementById("playerScore").innerHTML = "BLACKJACK";
            //display ending modal and restart the game
            document.getElemenetById("end").innerHTML = "Player Wins";
            reset();
        }
        });
    };

    var stayBtn = document.getElementById("stay");

    //when the player clicks stay
    stayBtn.onclick = function () {
    //reveal the dealer's hand
    document.getElementById("dealer1").src = dealerHand[0].image;
    //update the dealer's score
    dealerScore += score(dealerHand[0].value, dealerHand[0].code);
    document.getElementById("dealerScore").innerHTML = dealerScore;

    //if the dealer score is 21, they win
    if (dealerScore == 21) {
            document.getElementById("dealerScore").innerHTML = "BLACKJACK";

            //display ending modal and restart the game
            document.getElementById("end").innerHTML = "Dealer Wins";
            reset();
    }
    //if the dealer's score is 17 or more, they win
    else if (dealerScore >= 17) {
        //display ending modal and restart the game
        document.getElementById("end").innerHTML = "Dealer Wins";
        reset();
    }
    else{
        draw();
    }
    };

    function draw() {
    //dealer draws a card
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(result => result.json())
        .then(function (json) {
        //create an img tag
        let card = document.createElement("img");
        //div the img tag will be added to
        let hand = document.getElementById("dealerHand");
        //sets the class to cards
        card.className = "cards";
        card.alt = "extra cards";
        //adds the card image to the img tag
        card.src = json.cards[0].image;
        //adds the card to the div tag
        hand.appendChild(card);

        //update dealer score
        dealerScore += score(json.cards[0].value, json.cards[0].code);
        document.getElementById("dealerScore").innerHTML = dealerScore;

        //if the dealer busts
        if (dealerScore > 21) {

            document.getElementById("dealerScore").innerHTML = "BUST";

            //display ending modal and restart the game
            document.getElementById("end").innerHTML = "Player Wins";
            reset();
        }
        //if the dealer gets blackjack
        else if (dealerScore == 21) {
            document.getElementById("dealerScore").innerHTML = "BLACKJACK";

            //display ending modal and restart the game
            document.getElementById("end").innerHTML = "Dealer Wins";
            reset();
        }
        //if the dealer's score is still under 17, keep drawing
        else if (dealerScore < 17) {
            draw();
        }
        //display the results after the dealer's turn
        results(dealerScore, playerScore);
        });
    }

    function results(dealerScore, playerScore) {
    //if the dealer scores higher, the dealer wins and the game restarts
    if (dealerScore > playerScore) {
        document.getElemenetById("end").innerHTML = "Dealer Wins";
        reset();
    }
    //if the player scores higher, the player wins and the game restarts
    if (playerScore > dealerScore) {
        document.getElementById("end").innerHTML = "Player Wins";
        reset();
    }
    //if they both score the same, it's a tie and the game restarts
    if (playerScore == dealerScore) {
        document.getElementById("end").innerHTML = "It's a Tie!";
        reset();
    }
    }

    function reset() {
    //display the ending modal 2 seconds after the game is over
    setTimeout(function () { modal2.style.display = "block"; }, 1750);

    //when the player clicks play again, restart the game
    resetBtn.onclick = function () {
        window.location.reload(false);
    };
    }
};
