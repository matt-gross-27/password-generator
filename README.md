# JavaScript: Password Generator

The application generates a random password that matches user criteria and then prints the result in a textarea element.
</br>
</br>

## How It Looks:

![password generator demo](./Assets/03-javascript-homework-demo.png)
</br>
</br>
## Links
Checkout: [Deployed Application Here](https://matt-gross-27.github.io/password-generator/)

Checkout: [Git Hub Repo Here](https://github.com/matt-gross-27/password-generator)
</br>
</br>

## How It Works:

`1.` Click the Generate Password button to run `writePassword()`

`2.` `writePassword()` sets 'password' equal to the result of step 3

`3.` `generatePassword()`

1. Create a blank array: `passwordArray`

2. Prompt user to specify password length between 8 and 128 characters and store result as `promptLength`

3. Repeat previous step until answer is valid

4. `selectCharacters()` 
    1. Ask user if they would like to include each of the following character types:
        - Lowercase (abc...)
        - Uppercase (ABC...)
        - Numeric (123...)
        - Special (!@#...)

    2. Store user selections and set array `use.characters` to contain all characters of only the selected types.

    3. Repeat `selectCharacters()` until user chooses at least one character type, confirms her choices.

5. For `promptLength` less the number of selected character types:

    1. Randomly select a character from `use.characters`

    2. Insert that character to the end of the `passwordArray`

    3. Require selected characters are used by adding one character to the end of `passwordArray` from each selected type

6. [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) `passwordArray`
```
this randomly locates the required characters added to end of the `password array` in step 5.3
```
7. Convert the `passwordArray` to a Sting and return value to `generatePassword()`

`4.` Display the password to user in a textarea