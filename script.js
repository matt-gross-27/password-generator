/*~*~*~*~*~*~* Assignment Code *~*~*~*~*~*~*/
var generateBtn = document.querySelector("#generate");

/*~*~*~*~*~*~* GLOBAL VARIABLES *~*~*~*~*~*~*/
// define character sets
var characters = {
  alphaLower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  alphaUpper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  numeric: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  special: ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]
};
// list of user choice variables. default user choices to false
var use = {
  alphaLower: false,
  alphaUpper: false,
  numeric: false,
  special: false,
  countCharacterSets: 0,
  characters: [],
  reset: function () {
    this.alphaLower = false;
    this.alphaUpper = false;
    this.numeric = false;
    this.special = false;
    this.countCharacterSets = 0;
    this.characters = [];
  }
}
/*~*~*~*~*~*~*FUNCTIONS*~*~*~*~*~*~*/
/*~Select Characters~*/
var selectCharacters = function () {
  // reset values of user selections
  use.reset();
  // loop as long as use.charTypes are all false
  while (!use.alphaLower && !use.alphaUpper && !use.numeric && !use.special) {
    //default use.characters as empty array
    var selectedCharactersAlert = "";
    // ask user: include lowercase?
    use.alphaLower = window.confirm("Include lowercase characters? (abc...)");
    if (use.alphaLower) {
      //add lowercase characters to use.characters array
      use.characters = use.characters.concat(characters.alphaLower);
      selectedCharactersAlert += '  - lowercase (abc...)\n';
      use.countCharacterSets++;
    }
    // ask user: include uppercase?
    use.alphaUpper = window.confirm("Include uppercase characters? (ABC...)");
    if (use.alphaUpper) {
      //add uppercase characters to var use.characters array
      use.characters = use.characters.concat(characters.alphaUpper);
      selectedCharactersAlert += '  - uppercase (ABC...)\n';
      use.countCharacterSets++;
    }
    // ask user: include numeric?
    use.numeric = window.confirm("Include numeric characters? (123...)");
    if (use.numeric) {
      //add numeric characters to var use.characters array
      use.characters = use.characters.concat(characters.numeric);
      selectedCharactersAlert += '  - numeric (123...)\n';
      use.countCharacterSets++;
    }
    // ask user: include special?
    use.special = window.confirm("Include special characters? (!@#...)");
    if (use.special) {
      // add special characters to var use.characters array
      use.characters = use.characters.concat(characters.special);
      selectedCharactersAlert += '  - special (!@#...)\n';
      use.countCharacterSets++;
    }
    // if no characters were selected alert user they need to select some and start while loop again
    if (!use.alphaLower && !use.alphaUpper && !use.numeric && !use.special) {
      window.alert("Passwords need characters. Try Again!");
    }
    else {
      // ask user to confirm selected characters
      var confirmCharacters = window.confirm(
        "You have selected the following character types:\n" +
        selectedCharactersAlert +
        "Would you like to generate your password? Select OK \nWant to change your characters? Select Cancel");
      // if they do not confirm, reset characters which will keep them in while loop
      if (!confirmCharacters) {
        use.reset();
      }
    }
  }
}
// Generate Password Function
var generatePassword = function () {
  //reset password
  var passwordArray = [];
  // ask for password length
  var promptLength = window.prompt("Please choose a password length.\nType a number between 8 and 128.");
  // convert string to int
  promptLength = parseInt(promptLength);
  // test if user response is between 8 and 128
  if (promptLength >= 8 && promptLength <= 128) {
    // if true ask what types of characters to include
    selectCharacters();
    // for the length of password - 1 for each 'required' character type...
    for (var i = 0; i < promptLength - use.countCharacterSets; i++) {
      // choose a random character from all selected character sets...
      var randomCharacter = use.characters[Math.floor(Math.random() * use.characters.length)];
      // and add that character to passwordArray.
      passwordArray.push(randomCharacter);
    }
    // if user selected lowercase
    if (use.alphaLower) {
      // add 1 lowercase character to passwordArray to make sure at least one makes it in.
      var addOn = characters.alphaLower[Math.floor(Math.random() * characters.alphaLower.length)];
      passwordArray.push(addOn);
    }
    // if user selected uppercase
    if (use.alphaUpper) {
      // add 1 uppercase character to passwordArray
      addOn = characters.alphaUpper[Math.floor(Math.random() * characters.alphaUpper.length)];
      passwordArray.push(addOn);
    }
    // if user selected numeric
    if (use.numeric) {
      // add 1 numeric character to passwordArray
      addOn = characters.numeric[Math.floor(Math.random() * characters.numeric.length)];
      passwordArray.push(addOn);
    }
    // if user selected special
    if (use.special) {
      // add 1 special character to passwordArray
      addOn = characters.special[Math.floor(Math.random() * characters.special.length)];
      passwordArray.push(addOn);
    }
    // "Fisher-Yates Shuffle" the password array so required characters appear in random positions instead of appended onto the end
    for (var i = passwordArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i)
      var storeToSwap = passwordArray[i]
      passwordArray[i] = passwordArray[j]
      passwordArray[j] = storeToSwap
    }
    //convert passwordArray to a string
    var passwordString = passwordArray.join('');
    //return that string so it can be accessed by writePassword() function's first statement
    return passwordString;
  }
  //else the user didn't choose a length between 8 and 128 - start over
  else {
    window.alert("please enter a valid answer");
    return generatePassword();
  }
};

// Write Password Function: writes generatePassword result to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
};

// clicking the generateBtn calls function writePassword()
generateBtn.addEventListener("click", writePassword);