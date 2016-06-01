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
let futility = new Futility(/* customWordList, customLetterList */);

futility.test('Kiss my @$5') // returns true

futility.replace('Kiss my @$5', 'face') // returns 'Kiss my face'

futility.censor('Kiss my @$5') // returns 'Kiss my *!#'
```
