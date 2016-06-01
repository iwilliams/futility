# Futility

Futility is a library for the client or server that can help you detect naughty words in strings. Users can usually find a way around word blacklists and censorship is an almost impossilbe task, but if you have to do it, Futility can help (maybe). By providing a word list and an object that represents alternatives to letters in those words, Futility will build a RegExp object that you can use to test your user's input.

## Getting Started

### Install

`npm install futility`

### Import

```JavaScript
import Futility from 'futility';
```

### or require

```JavaScript
const Futility = require('futility').default;
```

## Basic Usage

```JavaScript
// Create a futility object with the default provided words and lists
let futility = new Futility(/* customWordList, customLetterList */);

futility.test('Kiss my @$5') // returns true

futility.replace('Kiss my @$5', 'face') // returns 'Kiss my face'

futility.censor('Kiss my @$5' /*, customSymbols */) // returns 'Kiss my *!#'

// Create a futility object with a custom word list
let futility = new Futility([
    'boat',
    'car',
    'train'
]);

futility.test('I drive a car') // returns true
```

## API

#### `new Futility(/* customWordList, customLetterList */)`
Creates a new instance of Futility with a custom word list and/or a custom letter list. If you do not provided your own lists the defaults will be used. You can take a look at the [default word list](src/default-words.json) and the [default letter list](src/default-letters.json) to see how those are formatted.

#### `.test(String s)`
Returns true if a naughty word is found in string `s` and false if the string is clean.

#### `.replace(String s, (String replacement|Function replacement))`
Replaces naughty words in string `s` with string `replacement` or applys the `replacement` function to the matched string (same as `String.replace`).

#### `.censor(String s /*, String [customSymbols='#$@&%*!'] */)`
Will replace naughty words in string `s` with random characters, comic book style, from the default customSymbols or provided string of custom symbols.

## Contributing
Tests are written with mocha.

`mocha`
