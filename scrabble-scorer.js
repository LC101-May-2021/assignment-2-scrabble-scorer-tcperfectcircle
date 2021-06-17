// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let userWord = input.question(`Let's play some scrabble! Enter a word: `);
  // while (userWord !== String){
  //   userWord = input.question(`Error: Please enter a valid word: `)
  // }
  return userWord;
};


let simpleScore = function (word) {
  return word.length;
  };


let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])){
      letterPoints += 3;
    }
    else {
      letterPoints += 1;
    }
	}
  return letterPoints;
};



let scrabbleScore = function (word){
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
    letterPoints += newPointStructure[word[i]];
  }
  return letterPoints;
};

const scoringAlgorithms = [
  {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
  },
 {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
  },
 {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
  }
  ];

function scorerPrompt() {
  console.log(`Which scoring algorithm would you like to use?\n`);
  for (let i = 0; i < scoringAlgorithms.length; i++){
    let whichScore = scoringAlgorithms[i];
    console.log(i + '-' + whichScore.name + whichScore.description)
  }
  let choice = Number (input.question(`Enter 0, 1, or 2: `));
  // let spl="~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
  // while (choice < 0 || choice > 2 || choice.includes(spl)) {
  //   choice = Number (input.question(`Error: Please select a valid scoring option: `));
  // };
  return scoringAlgorithms[choice];
};


function transform(structure) {
  let newObject = {};
  for (let item in structure){
    let letters = structure[item];
    for (let i = 0; i < letters.length; i++){
      newObject[letters[i].toLowerCase()] = Number (item);
      }
  }
return newObject;
};

let newPointStructure = transform(oldPointStructure);
// newPointStructure[' '] = 0;

function runProgram() {
  let word1 = initialPrompt();
  let scoreSomething = scorerPrompt().scoringFunction;
  let scoreFinal = scoreSomething(word1);
  console.log(`Score for '${word1}': ${scoreFinal}`);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

