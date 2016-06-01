import defaultWords   from './default-words';
import defaultLetters from './default-letters';

class Futility extends RegExp {
    constructor(wordList = defaultWords, letterList = defaultLetters) {
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

        super(regExpArray.join('|'), 'i');
    }
}

export function censor(symbols = '#$@&%*!') {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    return match => match.replace(/./g, word => symbols.charAt(getRandomInt(0, symbols.length)));
}

export { defaultWords as defaultWords };
export { defaultLetters as defaultLetters };
export default Futility;
