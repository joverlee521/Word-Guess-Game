// Array of dog breeds where words are chosen from
var dogBreeds = ["labrador retriever", "german shepherd", "golden retriever", "french bulldog", "beagle", "poodle", "husky","australian shepherd", "shih tzu", "pomeranian", "cocker spaniel", "pug", "chihuahua", "maltese", "shiba inu", "papillon", "malamute", "dalmatian", "schnauzer", "dachshunds"];
// Array of src for pictures corresponding to each dog breed
var dogPics = ["assets/images/labrador-retriever.png", "assets/images/german-shepherd.jpg", "assets/images/golden-retriever.jpg", "assets/images/french-bulldog.jpg", "assets/images/beagle.jpg", "assets/images/poodle.jpg", "assets/images/husky.jpg", "assets/images/australian-shepherd.jpg", "assets/images/shih-tzu.jpg", "assets/images/pomeranian.jpg", "assets/images/cocker-spaniel.jpg", "assets/images/pug.jpg", "assets/images/chihuahua.jpg", "assets/images/maltese.jpg", "assets/images/shiba-inu.jpg", "assets/images/papillon.jpg", "assets/images/malamute.jpg", "assets/images/dalmatian.jpg", "assets/images/schnauzer.jpg", "assets/images/dachshund.jpg"]
// Array of letters in the alphabet to check against during the game
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// Empty array to fill in with _ for current word
var guessingWord = [];
// Empty array to fill with letters already guessed
var alreadyUsed = [];

var chosenWord = " ";
var userInput = " ";
var indexNumber = 0;
var isFirstKey = true;
var wins = 0;
var losses = 0;
var guessesLeft = 5;

// The actual game 
var game = {
    // Choosing a random dog breed with matching picture and provide empty array for current word
    randomWord() {
        indexNumber = Math.floor(Math.random()*dogBreeds.length);
        chosenWord = dogBreeds[indexNumber];
        document.getElementById("img-id").src=dogPics[indexNumber];
        document.getElementById("guesses-left").innerHTML = 5;
        for(var i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === " "){
                guessingWord.push(" ");
            }
            else {
                guessingWord.push("_");
            }
        }
        document.getElementById("current-word").innerHTML = guessingWord.join(" ");
    },
    // Function for how the game starts wth first keyup
    startGame() {
        document.getElementById("start").innerHTML = "Try to guess the breed of the puppy one letter at a time!";
        this.randomWord();
        document.getElementById("wins").innerHTML = 0;
        document.getElementById("losses").innerHTML = 0;
        isFirstKey = false;
    },
    // Function for in game logic
    inGame() {
        document.onkeyup = function(event) {
            // checks the user input is a valid letter of the alphabet
            if(alphabet.indexOf(event.key) >= 0){
                userInput = event.key;
            }
            else {
                alert("Please only type in letters");
            }
            // checks if user input is present in chosen word
            var userInputIndex = chosenWord.indexOf(userInput);
            // if user input matches letter in chosen word then adds user input into empty string at correct index
            if(userInputIndex >= 0){
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
                alreadyUsed.push(userInput);
                document.getElementById("already-guessed").innerHTML = alreadyUsed; 
            }
            
            if(guessingWord.join('') === chosenWord) {
                wins++;
                document.getElementById("wins").innerHTML = wins;
                guessingWord = [];
                alreadyUsed = [];
                game.randomWord();
            }

        }    
        
    },
    
    
}

document.onkeyup = function() {
    if(isFirstKey) game.startGame();
    game.inGame()
    // if(guessingWord = []) game.randomWord;
}


