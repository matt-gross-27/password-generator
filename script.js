/*~~~~~~~~~~~~~~~CHECK LIST~~~~~~~~~~~~~~~*
  GIVEN I need a new, secure password:
  
  WHEN I click the button to generate a password
  THEN I am presented with a series of prompts for password criteria
    -done
  
  WHEN prompted for password criteria
  THEN I select which criteria to include in the password
    -done
  
  WHEN prompted for the length of the password
  THEN I choose a length of at least 8 characters and no more than 128 characters
    -done
  
  WHEN prompted for character types to 'INCLUDE' in the password 
  THEN I choose lowercase, uppercase, numeric, and/or special characters
    -as of now: character types are 'allowed' NOT 'included' 
    -each character type won't always be included if 2 or more types are selected
    -the longer the password the more likely each type will be included
  
  WHEN I answer each prompt
  THEN my input should be validated and at least one character type should be selected
    -each prompt is not validated only one type included is validated
  
  WHEN all prompts are answered
  THEN a password is generated that matches the selected criteria
    -done
  
  WHEN the password is generated
  THEN the password is either displayed in an alert or written to the page
    -done
*~~~~~~~~~~~~~~~~CHECK LIST~~~~~~~~~~~~~~~*/

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Define character sets
var characters = {
  alphaLower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  alphaUpper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  numeric: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  special: ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]
};

// List of user choice variables. default user choices to false
var use = {
  alphaLower: false,
  alphaUpper: false,
  numeric: false,
  special: false,
  characters: [],
  reset: function() {
    this.alphaLower = false;
    this.alphaUpper = false;
    this.numeric = false;
    this.special = false;
    this.characters = [];
  }
}

// select characters function
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
    }

    // ask user: include uppercase?
    use.alphaUpper = window.confirm("Include uppercase characters? (ABC...)");
    if (use.alphaUpper) {
      //add uppercase characters to var use.characters array
      use.characters = use.characters.concat(characters.alphaUpper);
      selectedCharactersAlert += '  - uppercase (ABC...)\n';
    }

    // ask user: include numeric?
    use.numeric = window.confirm("Include numeric characters? (123...)");
    if (use.numeric) {
      //add numeric characters to var use.characters array
      use.characters = use.characters.concat(characters.numeric);
      selectedCharactersAlert += '  - numeric (123...)\n';
    }

    // ask user: include special?
    use.special = window.confirm("Include special characters? (!@#...)");
    if (use.special) {
      // add special characters to var use.characters array
      use.characters = use.characters.concat(characters.special);
      selectedCharactersAlert += '  - special (!@#...)\n';
    }
    
    // if no characters were selected reenter loop
    if (!use.alphaLower && !use.alphaUpper && !use.numeric && !use.special) {
      window.alert("Passwords need characters. Try Again!");
    }
    else {
      // ask user to confirm selected characters
      var confirmCharacters = window.confirm(
        "You have selected the following character types:\n" +
        selectedCharactersAlert +
        "Would you like to generate your password?");
      // if they do not confirm, reset characters which will keep them in while loop
      if (!confirmCharacters) {
        use.reset();
      }
    }
  }
}

// Generate Password
var generatePassword = function () {
  //reset password
  var randomString = "";
  // ask for password length
  var promptLength = window.prompt("Please choose a password length.\nEnter a number between 8 and 128");
  // convert string to int
  promptLength = parseInt(promptLength);
  // test if promptLength between 8 and 128
  if (promptLength >= 8 && promptLength <= 128) {
    // if true ask what types of characters to include select characters
    selectCharacters();
    // for loop to generate characters for length of password
    for (var i = 0; i < promptLength; i++) {
      //create a random character
      var randomChar = use.characters[Math.floor(Math.random() * use.characters.length)];
      //update a radom string using each random character[i]
      randomString = randomString + randomChar;
    }
    return randomString;
  }
  else {
    window.alert("please enter a valid answer");
    return generatePassword();
  }
};

// write password to the #password input
function writePassword() {
  
  var password = generatePassword();

  var passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// clicking the generateBtn calls function writePassword()
generateBtn.addEventListener("click", writePassword);