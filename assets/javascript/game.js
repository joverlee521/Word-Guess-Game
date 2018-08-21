// Array of dog breeds where words are chosen from
var dogBreeds = ["labrador retriever", "german shepherd", "golden retriever", "french bulldog", "beagle", "poodle", "husky","australian shepherd", "shih tzu", "pomeranian", "cocker spaniel", "pug", "chihuahua", "maltese", "shiba inu", "papillon", "malamute", "dalmatian", "schnauzer", "dachshunds"];
// Array of src for pictures corresponding to each dog breed
var dogPics = ["assets/images/labrador-retriever.png", "assets/images/german-shepherd.jpg", "assets/images/golden-retriever.jpg", "assets/images/french-bulldog.jpg", "assets/images/beagle.jpg", "assets/images/poodle.jpg", "assets/images/husky.jpg", "assets/images/australian-shepherd.jpg", "assets/images/shih-tzu.jpg", "assets/images/pomeranian.jpg", "assets/images/cocker-spaniel.jpg", "assets/images/pug.jpg", "assets/images/chihuahua.jpg", "assets/images/maltese.jpg", "assets/images/shiba-inu.jpg", "assets/images/papillon.jpg", "assets/images/malamute.jpg", "assets/images/dalmatian.jpg", "assets/images/schnauzer.jpg", "assets/images/dachshund.jpg"];
// Array of letters in the alphabet to check against during the game
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// Empty array to fill in with _ for current word
var guessingWord = [];
// Empty array to fill with letters already guessed
var alreadyGuessed = [];
// Array to include all used letters
var allUsedLetters = [];

var chosenWord = "";
var userInput = "";
var indexNumber = 0;
var isFirstKey = true;
var wins = 0;
var losses = 0;
var guessesLeft = 5;

// Sounds effects of the game
var loseAudio = new Audio("assets/sounds/sad-effect.mp3");
var winAudio = new Audio("assets/sounds/win-effect.mp3");
var errorAudio = new Audio("assets/sounds/error.mp3");
var endAudio = new Audio("assets/sounds/thats-all-folks.mp3");

// The game 
var game = {
    // Function for how the game initializes wth first keyup
    initializeGame() {
        document.getElementById("start").innerHTML = "Try to guess the breed of the puppy one letter at a time!";
        document.getElementById("wins").innerHTML = 0;
        document.getElementById("losses").innerHTML = 0;
        this.startGame();
        $("#cartoonVideo").attr('src', '');
        isFirstKey = false;
    },
    // Starts the game by choosing a random dog breed with matching picture and provide empty array for current word
    startGame() {
        // Emptying all the arrays to have clean slate each time the game restarts
        guessingWord = [];
        alreadyGuessed = [];
        document.getElementById("already-guessed").innerHTML = alreadyGuessed;
        allUsedLetters = [];
        guessesLeft = 5;
        document.getElementById("guesses-left").innerHTML = 5;
        // Picking a random index number to use for choosing dog breed and dog pic
        indexNumber = Math.floor(Math.random()*dogBreeds.length);
        chosenWord = dogBreeds[indexNumber];
        document.getElementById("img-id").src=dogPics[indexNumber];
        // Deletes all classes for dog pic so it can be returned to low opacity at the start of each game
        document.getElementById("img-id").className = "";
        document.getElementById("img-id").classList.add("opacity1");
        // Setting up the guessing word array to have spaces matching the choosen word
        for(var i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === " "){
                guessingWord.push("&nbsp");
            }
            else {
                guessingWord.push("_");
            }
        }
        document.getElementById("current-word").innerHTML = guessingWord.join(" ");
    },
    // checks the user input is a valid letter of the alphabet
    validLetter(){
        // if it is a valid character, save the user's input
        if(alphabet.indexOf(event.key.toLowerCase()) >= 0){
            userInput = event.key.toLowerCase();
        }
        // if not valid, pop-up asks user to choose a valid letter
        else {
            console.log("validLetter else");
            document.getElementById("modal-content").innerHTML = "Please choose a valid letter!";
            this.playAudio(errorAudio);
            $("#my-modal").modal("show");
        }
    },
    // checks the user's input against the chosen word
    checkLetter(){
        var userInputIndex = chosenWord.indexOf(userInput);
        allUsedLetters = guessingWord.concat(alreadyGuessed);
        // if the user has used the same letter before, pop-up asks user to choose another letter
        if(allUsedLetters.indexOf(userInput) >= 0) {
            document.getElementById("modal-content").innerHTML = "Please choose another letter!"
            this.playAudio(errorAudio);
            $("#my-modal").modal("show");
        }
        // if user input matches letter in chosen word then adds user input into empty string at correct index
        else if(userInputIndex >= 0){
            for (var j=0; j < guessingWord.length; j++){
                if (chosenWord[j] == userInput) {
                    guessingWord.splice(j, 1, userInput);
                }
            }
            document.getElementById("current-word").innerHTML = guessingWord.join(" ");
        }
        // if user input does NOT match then adds user input into letters already guessed and decrease guesses left
        else {
            guessesLeft--;
            document.getElementById("guesses-left").innerHTML = guessesLeft;
            alreadyGuessed.push(userInput);
            document.getElementById("already-guessed").innerHTML = alreadyGuessed; 
        }
    }, 
    // changes opacity of picture when there is an incorrect guess 
    changePicture(){
        if (guessesLeft < 5){
            document.getElementById("img-id").classList.add("opacity2");
        }
        if (guessesLeft < 4){
            document.getElementById("img-id").classList.add("opacity3");
        }
        if (guessesLeft < 3) {
            document.getElementById("img-id").classList.add("opacity4");
        }
        if (guessesLeft < 2) {
            document.getElementById("img-id").classList.add("opacity5");
        }
    },
    // To confirm if the user wins the game
    winGame(){
        // Run this once all the spaces are filled
        if(guessingWord.indexOf("_") < 0){
            // Change the "&nbsp" in the guessing word back to spaces
            for(var k = 0; k < guessingWord.length; k++){
                if (guessingWord[k] === "&nbsp"){
                    guessingWord.splice(k, 1, " ");
                }
            }
            // Compares guessing word to chosen word to confirm win
            if(guessingWord.join('') === chosenWord) {
                wins++;
                document.getElementById("wins").innerHTML = wins;
                document.getElementById("img-id").classList.add("opacity5");
                document.getElementById("modal-win-lose").innerHTML = "YOU GUESSED IT!"
                winAudio.currentTime = 0;
                this.playAudio(winAudio);
                setTimeout(function(){$("#win-lose-modal").modal("show")}, 500); 
                this.removeWords();
            }
        }
    },
    // To confirm if the user loses the game
    loseGame(){
        // User losses if there are no more guesses left AND if there are still spaces left in their guess
        if(guessesLeft === 0 && guessingWord.indexOf("_" >= 0)) {
            losses++;
            document.getElementById("losses").innerHTML = losses;
            document.getElementById("modal-win-lose").innerHTML = "OH NO! YOU LOST!";
            loseAudio.currentTime = 0;
            this.playAudio(loseAudio);
            $("#win-lose-modal").modal("show");    
            this.removeWords();
        }
    },
    removeWords(){
        // Removing the choosen word from the arrays so it doesn't get repeated
        dogBreeds.splice(indexNumber,1);
        dogPics.splice(indexNumber,1);
    },
    // Play and stop audio files
    playAudio(x){
        x.play();
    },
    stopAudio(y){
        y.pause();
    },
    endGame(){
        var video = document.getElementById("end-video");
        var url = $("#end-video").attr('src');
        if(dogBreeds.length == 0){
            $("#end-modal").modal("show"); 
            this.playAudio(endAudio);
        }
    },
    // All processes needed in the game after the initial onkeyup
    inGame() {
        document.onkeyup = function(event) {
            game.validLetter();
            game.checkLetter();
            game.changePicture();
            game.winGame();
            game.loseGame();
            game.endGame();
        }
    }  
}

document.onkeyup = function() {
    if(isFirstKey) game.initializeGame();
    game.inGame();
}


