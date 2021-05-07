/*
 * This files holds all the code to for your card game
 */

//Run once broswer has loaded everything
window.onload = function () {
    // Get the modal
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");

    //Element that closes the modal and starts the game
    var dealBtn = document.getElementById("deal");

    var resetBtn = document.getElementById("reset");

    // Open the starting modal
    modal.style.display = "block";

    // When the user clicks on the deal button, close the modal
    dealBtn.onclick = function() {
    modal.style.display = "none";
    };
        
    //Getting and setting the deck id, using six decks
    var deckId = "";
        
    //player and dealer info
    var playerHand = [];
    var playerScore = 0;
    var dealerHand = [];
    var dealerScore = 0;

    dealBtn.addEventListener("click", function(){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
    .then(result => result.json())
    .then(function(json){
        deckId = json.deck_id;
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
        .then(result => result.json())
        .then(function(json){
        dealerHand.push(json.cards[0]);
        dealerHand.push(json.cards[1]);
        playerHand.push(json.cards[2]);
        playerHand.push(json.cards[3]);
        })
        //adds the card images and score to the board
        .then(function(){
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
        });
    });
    });

    //Calculates the value of each card
    function score(value, code){
    let score = 0;
    let playerCards = playerHand.map(x =>x.code);
    let dealerCards = dealerHand.map(x => x.code);
    //if the card value is a number, the card score is that number
    if (!isNaN(parseInt(value))){
        score = parseInt(value);
    }
    else if(value == "ACE"){
        if((playerCards.includes(code) && playerScore<11) || (dealerCards.includes(code) && dealerScore<11)){
        score = 11;
        }
        else{
        score = 1;
        }
    }
    //if the card is a face card, the score is 10
    else{
        score = 10;
    }
    //if the deck contains an ace and will go over 21 with this card, subtract 10
    return score;
    }

    var hitBtn = document.getElementById("hit");

    hitBtn.onclick = function(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(result => result.json())
    .then(function(json){
        //creates an img tag to display the card drawn
        let card = document.createElement("img");
        let hand = document.getElementById("playerHand");
        card.className = "cards";
        card.alt = "extra cards";
        card.src = json.cards[0].image;
        hand.appendChild(card);

        playerScore += score(json.cards[0].value, json.cards[0].code);
        document.getElementById("playerScore").innerHTML = playerScore; 

        if(playerScore>21){
        document.getElementById("playerScore").innerHTML = "BUST";

        //display the dealer's hand here using flip animation
        document.getElementById("dealer1").src = dealerHand[0].image;

        dealerScore += score(dealerHand[0].value, dealerHand[0].code);
        document.getElementById("dealerScore").innerHTML = dealerScore;
                
        document.getElementById("end").innerHTML = "Dealer Wins";

        reset();
    }
    if(playerScore==21){
        document.getElementById("playerScore").innerHTML = "BLACKJACK";

        document.getElemenetById("end").innerHTML = "Player Wins";

        reset();
    }
    });
    }

    var stayBtn = document.getElementById("stay");

    stayBtn.onClick = function(){
    console.log("stay");
    
    document.getElementById("dealer1").src = dealerHand[0].image;

    dealerScore += score(dealerHand[0].value, dealerHand[0].code);
    document.getElementById("dealerScore").innerHTML = dealerScore;

    draw(); 
    }
    function draw(){
    //draw a card
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(result => result.json())
    .then(function(json){
        //add it to the dealer's hand
        let card = document.createElement("img");
        let hand = document.getElementById("dealerHand");
        card.className = "cards";
        card.alt = "extra cards";
        card.src = json.cards[0].image;
        hand.appendChild(card);
        
        dealerScore += score(json.cards[0].value, json.cards[0].code);
        document.getElementById("dealerScore").innerHTML = dealerScore;
    });
    if(dealerScore>21){
        document.getElementById("dealerScore").innerHTML = "BUST";

        document.getElementById("end").innerHTML = "Player Wins";

        reset();

    }
    else if(dealerScore==21){
        document.getElementById("dealerScore").innerHTML = "BLACKJACK";

        document.getElementById("end").innerHTML = "Dealer Wins";

        reset();
    
    }
    else if(dealerScore<17){
        draw();
    }
    else{
        results();
    }
    }  

    function results(){

    if(dealerScore>playerScore){
        document.getElemenetById("end").innerHTML = "Dealer Wins";

        reset();

    }

    if(playerScore>dealerScore){
        document.getElementById("end").innerHTML = "Player Wins";

        reset(); 
    }

    if(playerScore==dealerScore){
        document.getElementById("end").innerHTML = "It's a Tie!";
        
        reset();
        }
    }

    function reset(){
    modal2.style.display = "block";

        resetBtn.onclick = function(){
        window.location.reload(false);
        };
    }
}