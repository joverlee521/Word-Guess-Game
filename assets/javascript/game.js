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

// Variables for html ids
var startPrint = document.getElementById("start");
var winsPrint = document.getElementById("wins");
var lossesPrint = document.getElementById("losses");
var alreadyGuessedPrint = document.getElementById("already-guessed");
var guessesLeftPrint = document.getElementById("guesses-left");
var imgPrint = document.getElementById("img-id");
var currentWordPrint = document.getElementById("current-word");
var modalContentPrint = document.getElementById("modal-content");
var modalWinLosePrint = document.getElementById("modal-win-lose");

// The game 
var game = {
    // Function for how the game initializes wth first keyup
    initializeGame() {
        startPrint.innerHTML = "Try to guess the breed of the puppy one letter at a time!";
        winsPrint.innerHTML = 0;
        lossesPrint.innerHTML = 0;
        this.startGame();
        isFirstKey = false;
    },
    // Starts the game by choosing a random dog breed with matching picture and provide empty array for current word
    startGame() {
        // Emptying all the arrays to have clean slate each time the game restarts
        guessingWord = [];
        alreadyGuessed = [];
        alreadyGuessedPrint.innerHTML = alreadyGuessed;
        allUsedLetters = [];
        guessesLeft = 5;
        guessesLeftPrint.innerHTML = 5;
        // Picking a random index number to use for choosing dog breed and dog pic
        indexNumber = Math.floor(Math.random()*dogBreeds.length);
        chosenWord = dogBreeds[indexNumber];
        imgPrint.src=dogPics[indexNumber];
        // Deletes all classes for dog pic so it can be returned to low opacity at the start of each game
        imgPrint.className = "";
        imgPrint.classList.add("opacity1");
        // Setting up the guessing word array to have spaces matching the choosen word
        for(var i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === " "){
                guessingWord.push("&nbsp");
            }
            else {
                guessingWord.push("_");
            }
        }
        currentWordPrint.innerHTML = guessingWord.join(" ");
    },
    // checks the user input is a valid letter of the alphabet and if they are reusing letters
    validLetter(){
        // if it is a valid character, save the user's input
        if(alphabet.indexOf(event.key.toLowerCase()) >= 0){
            userInput = event.key.toLowerCase();
            // if the user has used the same letter before, pop-up asks user to choose another letter
            if(allUsedLetters.indexOf(userInput) >= 0) {
                modalContentPrint.innerHTML = "Please choose another letter!"
                this.playAudio(errorAudio);
                $("#my-modal").modal("show");
            }    
        }
        // if not valid, pop-up asks user to choose a valid letter
        else {
            modalContentPrint.innerHTML = "Please choose a valid letter!";
            this.playAudio(errorAudio);
            $("#my-modal").modal("show");
        }
    },
    // checks the user's input against the chosen word
    checkLetter(){
        var userInputIndex = chosenWord.indexOf(userInput);
        allUsedLetters = guessingWord.concat(alreadyGuessed);
        // if user input matches letter in chosen word then adds user input into empty string at correct index
        if(userInputIndex >= 0){
            for (var j=0; j < guessingWord.length; j++){
                if (chosenWord[j] == userInput) {
                    guessingWord.splice(j, 1, userInput);
                }
            }
            currentWordPrint.innerHTML = guessingWord.join(" ");
        }
        else if (userInputIndex < 0 && allUsedLetters.indexOf(userInput) >= 0){
            game.validLetter();
        }
        // if user input does NOT match then adds user input into letters already guessed and decrease guesses left
        else {
            guessesLeft--;
            guessesLeftPrint.innerHTML = guessesLeft;
            alreadyGuessed.push(userInput);
            alreadyGuessedPrint.innerHTML = alreadyGuessed; 
        }
    }, 
    // changes opacity of picture when there is an incorrect guess 
    changePicture(){
        if (guessesLeft < 5){
            imgPrint.classList.add("opacity2");
        }
        if (guessesLeft < 4){
            imgPrint.classList.add("opacity3");
        }
        if (guessesLeft < 3) {
            imgPrint.classList.add("opacity4");
        }
        if (guessesLeft < 2) {
            imgPrint.classList.add("opacity5");
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
                winsPrint.innerHTML = wins;
                imgPrint.classList.add("opacity5");
                modalWinLosePrint.innerHTML = "YOU GUESSED IT!";
                this.removeWords();
                if(dogBreeds.length > 0){
                    winAudio.currentTime = 0;
                    this.playAudio(winAudio);
                    setTimeout(function(){$("#win-lose-modal").modal({show: true, keyboard: false, backdrop: "static"})}, 500);
                }
            }
        }
    },
    // To confirm if the user loses the game
    loseGame(){
        // User losses if there are no more guesses left AND if there are still spaces left in their guess
        if(guessesLeft === 0 && guessingWord.indexOf("_" >= 0)) {
            losses++;
            lossesPrint.innerHTML = losses;
            modalWinLosePrint.innerHTML = "OH NO! YOU LOST!";
            this.removeWords();
            if(dogBreeds.length > 0){
                loseAudio.currentTime = 0;
                this.playAudio(loseAudio);
                $("#win-lose-modal").modal({show: true, keyboard: false, backdrop: "static"});    
            }
        }
    },
    // Removing the choosen word from the arrays so it doesn't get repeated
    removeWords(){
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
        if(dogBreeds.length == 0){
            $("#end-modal").modal("show"); 
            this.playAudio(endAudio);
        }
    }
}

document.onkeyup = function() {
    if(isFirstKey) {
        game.initializeGame();
    }
    else {
        game.validLetter();
        game.checkLetter();
        game.changePicture();
        game.winGame();
        game.loseGame();
        game.endGame();
    }
}