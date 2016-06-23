var assert     = require('chai').assert;
var Futility   = require('../dist/futility').default;
var wordList   = require('../dist/futility').defaultWords;
var letterList = require('../dist/futility').defaultLetters;

describe('Futility', function() {
    it('Imports correctly', function() {
        assert.isDefined(Futility, 'Futility has been defined');
        assert.isFunction(Futility);

        assert.isDefined(wordList, 'defaultWords is defined');
        assert.isArray(wordList, 'defaultWords is an array');

        assert.isDefined(letterList, 'defaultLetters is defined');
        assert.isObject(letterList, 'defaultLetters is an object');
    });

    it('Creates an instance', function() {
        var futility = new Futility();
        assert.isOk(futility);
        assert.isObject(futility);
    });

    describe('#test()', function() {
        var futility;

        var customWords = [
            "boat",
            "car",
            "train"
        ];

        beforeEach(function() {
            futility        = new Futility(wordList, letterList);
            customFutility  = new Futility(customWords);
        });

        it('Returns true when there is a naughty word', function() {
            // Test ass with leet speak
            assert.isTrue(futility.test('you\'re an ass hole'), 'ass');
            assert.isTrue(futility.test('you\'re an @ss hole'), '@ss');
            assert.isTrue(futility.test('you\'re an a$s hole'), 'a$s');
            assert.isTrue(futility.test('you\'re an as$ hole'), 'as$');
            assert.isTrue(futility.test('you\'re an a$$ hole'), 'a$$');
            assert.isTrue(futility.test('you\'re an a5s hole'), 'a5s');
            assert.isTrue(futility.test('you\'re an as5 hole'), 'as5');
            assert.isTrue(futility.test('you\'re an a55 hole'), 'a55');
            assert.isTrue(futility.test('you\'re an @$s hole'), '@$s');
            assert.isTrue(futility.test('you\'re an @$$ hole'), '@$$');
            assert.isTrue(futility.test('you\'re an @5s hole'), '@5s');
            assert.isTrue(futility.test('you\'re an @55 hole'), '@55');
            assert.isTrue(futility.test('you\'re an @$5 hole'), '@$5');
            assert.isTrue(futility.test('you\'re an @5$ hole'), '@5$');

            // Test shit with leet speak
            assert.isTrue(futility.test('I just took a shit'));
            assert.isTrue(futility.test('I just took a sh1t'));

            // Test a bad word with spaces
            assert.isTrue(futility.test('Can I have a blow job?'), 'Normal space');
            assert.isTrue(futility.test('Can I have a blow  job?'), 'Two spaces');
            assert.isTrue(futility.test('Can I have a blow                   job?'), 'Many spaces');
            assert.isTrue(futility.test('Can I have a blow_job?'), 'Space substituted for _');
            assert.isTrue(futility.test('Can I have a blowjob?'), 'No space');
            assert.isTrue(futility.test('Can I have a blowxXxjob?'), 'Xs for spaces');
            assert.isTrue(futility.test('Can I have a blow-job?'), '- for space');
            assert.isTrue(futility.test('Can I have a blow---job?'), 'Many -s');
            assert.isTrue(futility.test('Can I have a blow***job?'), '*s for spaces');
            assert.isTrue(futility.test('Can I have a blow_-x*** job?'), 'Mixture of all for spaces');
        });

        it('Returns true when there is a custom naughty word', function() {
            assert.isTrue(customFutility.test('I drive a car'));
            assert.isTrue(customFutility.test('Do you drive a boat?'));
            assert.isTrue(customFutility.test('I don\'t like trains'));
        });

        it('Returns false when there is no naughty word', function() {
            assert.isFalse(futility.test('love me'));
            assert.isFalse(futility.test('hello world'));
            assert.isFalse(futility.test('the quick brown fox jumps over the lazy dog'));
        });

        it('Returns false when there is no custom naughty word', function() {
            assert.isFalse(customFutility.test('Planes are alright'));
            assert.isFalse(customFutility.test('Tractors are pretty cool'));
        });
    });

    describe('#replace()', function() {
        var futility;

        beforeEach(function() {
            futility = new Futility();
        });

        it('Replaces naughty words', function() {
            assert.equal('love me', futility.replace('fuck me', 'love'));
        });

        it('Replaces multiple naughty words', function() {
            assert.equal('face my face', futility.replace('fuck my ass', 'face'));
        });

        it('Doesn\'t replace wholesome words', function() {
            assert.equal('This sentance is not naughty', futility.replace('This sentance is not naughty', 'censored'));
        });
    });

    describe('#censor()', function() {
        var futility;

        beforeEach(function() {
            futility = new Futility();
        });

        it('Censors naughty words', function() {
            assert.equal('**** me', futility.censor('fuck me', '*'));
        });

        it('Doesn\'t censors wholesome words', function() {
            assert.equal('love me', futility.censor('love me', '*'));
        });
    });

    describe('getters', function() {
        var futility;

        var customWords = [
            "boat",
            "car",
            "train"
        ];

        beforeEach(function() {
            futility        = new Futility(wordList, letterList);
            customFutility  = new Futility(customWords);
        });

        it('Can retrieve the set word list', function() {
            assert.equal(wordList, futility.wordList);
        });

        it('Can retrieve the set letter list', function() {
            assert.equal(letterList, futility.letterList);
        });

        it('Can retrieve the set custom word list', function() {
            assert.equal(customWords, customFutility.wordList);
        });
    });
});
