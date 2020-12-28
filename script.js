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

var characters = {
  alphaLower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  alphaUpper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  numeric: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  special: ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}" ,"~"]
};

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Generate Password
var generatePassword = function(){

  //reset password and chosen characters before regenerating
  var randomString = "";
  var userCharacters = [];
  var alphaLower = false;
  var alphaUpper = false;
  var numeric = false;
  var special = false;

  // ask for password length
  var promptLength = window.prompt("Please choose a password length.\nEnter a number between 8 and 128");
  
  // convert string to int
  promptLength = parseInt(promptLength);
  
  // test if promptLength between 8 and 128
  if (promptLength >= 8 && promptLength <= 128) {
    
    // if true ask what types of characters to include
    
    // ask user: include lowercase?
    alphaLower = window.confirm ("allow lowercase characters? abc...");
    // ask user to confirm.
    alphaLower = window.confirm ("are you sure?");
    if(alphaLower) {
      //add lowercase to var userCharacters array
      userCharacters = userCharacters.concat(characters.alphaLower);
    }

    // ask user: include uppercase?
    alphaUpper = window.confirm ("allow uppercase characters? ABC...");
    // ask user to confirm.
    alphaUpper = window.confirm ("just confirming?");
    if(alphaUpper) {
      //add uppercase to var userCharacters array
      userCharacters = userCharacters.concat(characters.alphaUpper);
    }

    // ask user: include numeric?
    numeric = window.confirm ("allow numeric characters? 123...");
    // ask user to confirm.
    numeric = window.confirm ("are you positive?");
    if(numeric) {
      //add numeric to var userCharacters array
      userCharacters = userCharacters.concat(characters.numeric);
    }

    // ask user: include special?
    special = window.confirm ("allow special characters? !@#...");
    // ask user to confirm.
    special = window.confirm ("final answer?");
    if(special) {
      // add special to var userCharacters array
      userCharacters = userCharacters.concat(characters.special);
      }
    // log chosen characters to the console
    console.log(userCharacters);

      if( 
        alphaLower === false &&
        alphaUpper === false &&
        numeric === false &&
        special === false ) {
        window.alert("passwords need characters... try again");
        return generatePassword();
    }
    // for loop to generate characters for length of password
    for (var i = 0; i < promptLength; i++) {
      //create a random character
      var randomChar = userCharacters[Math.floor(Math.random() * userCharacters.length)];
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