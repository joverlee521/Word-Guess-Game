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

var chosenWord = " ";
var userInput = " ";
var indexNumber = 0;
var isFirstKey = true;
var wins = 0;
var losses = 0;
var guessesLeft = 5;

// The actual game 
var game = {
    // Function for how the game initializes wth first keyup
    initializeGame() {
        game.initializeArray;
        document.getElementById("start").innerHTML = "Try to guess the breed of the puppy one letter at a time!";
        this.startGame();
        document.getElementById("wins").innerHTML = 0;
        document.getElementById("losses").innerHTML = 0;
        isFirstKey = false;
    },
    // Starts the game by choosing a random dog breed with matching picture and provide empty array for current word
    startGame() {
        guessingWord = [];
        alreadyGuessed = [];
        allUsedLetters = [];
        guessesLeft = 5;
        indexNumber = Math.floor(Math.random()*dogBreeds.length);
        chosenWord = dogBreeds[indexNumber];
        document.getElementById("img-id").src=dogPics[indexNumber];
        document.getElementById("guesses-left").innerHTML = 5;
        for(var i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === " "){
                guessingWord.push("&nbsp");
            }
            else {
                guessingWord.push("_");
            }
        }
        document.getElementById("current-word").innerHTML = guessingWord.join(" ");
        document.getElementById("already-guessed").innerHTML = alreadyGuessed;
        dogBreeds.splice(indexNumber,1);
        dogPics.splice(indexNumber,1);
    },
    // checks the user input is a valid letter of the alphabet
    validLetter(){
        if(alphabet.indexOf(event.key) >= 0){
            userInput = event.key;
        }
        else {
            alert("Please only type in letters");
        }
    },
    // checks if user input is present in chosen word
    checkLetter(){
        var userInputIndex = chosenWord.indexOf(userInput);
        allUsedLetters = guessingWord.concat(alreadyGuessed);
        // checks if the user has used the same letter before
        if(allUsedLetters.indexOf(userInput) >= 0) {
            alert("please choose a new letter");
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
    // Function for in game logic
    inGame() {
        document.onkeyup = function(event) {
            game.validLetter();
            game.checkLetter();
            
            

            if(guessingWord.join('') === chosenWord) {
                wins++;
                document.getElementById("wins").innerHTML = wins;
                game.startGame();
            }

        }    
        
    },
    
    
}

document.onkeyup = function() {
    if(isFirstKey) game.initializeGame();
    game.inGame();
}


