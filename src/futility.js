import defaultWords   from './default-words';
import defaultLetters from './default-letters';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function regExp(wordList, letterList) {
    let letterRegExps = {};
    for(let letter in letterList) {
        letterRegExps[letter] = `(${[letter, ...letterList[letter]].join('|')})`;
    }

    let regExpArray = wordList.map(word => {
        let newWord = '';
        for(let i = 0; i < word.length; i++)
            newWord += letterRegExps[word[i]] || word[i];
        return newWord;
    });

    return new RegExp(regExpArray.join('|'), 'i');
}

class Futility {

    /**
     * Creates a new instance with the provided wordlist and letterlist
     */
    constructor(wordList = defaultWords, letterList = defaultLetters) {
        this._wordList   = wordList;
        this._letterList = letterList;
        this._regExp     = regExp(wordList, letterList);
    }

    get wordList() {
        return this._wordList;
    }

    get letterList() {
        return this._letterList;
    }

    get regExp() {
        return this._regExp;
    }

    /**
     * Test if a string contains a naughty word
     */
    test(word) {
        return this._regExp.test(word);
    }

    /**
     * Replace all occurances of naughty words
     */
    replace(word, replacement) {
        return word.replace(this._regExp, replacement);
    };

    /**
     * Comic book style censoring of string
     */
    censor(word, symbols = '#$@&%*!') {
        return this.replace(word, match => match.replace(/./g, word => symbols.charAt(getRandomInt(0, symbols.length))));
    }
}

//export { defaultWords as defaultWords };
//export { defaultLetters as defaultLetters };
export default Futility;
