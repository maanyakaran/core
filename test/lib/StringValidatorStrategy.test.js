const StringValidatorStrategy = require('../../lib/StringValidatorStrategy');

describe('String Validator tests', () => {
    it('should test contains validator method for valid input', () => {
        let validatorFunction  = StringValidatorStrategy.contains('substr');
        let expected = validatorFunction('inputstr_substr_str');
        expect(expected).toBe(null);
    })

    it('should test contains validator method for invalid input', () => {
        let validatorFunction  = StringValidatorStrategy.contains('substr');
        let expected = validatorFunction('inputstr_sub_str');
        expect(expected).toEqual('Does not contain ' + 'substr');
    })

    it('should test equals validator method for valid input', () => {
        let validatorFunction  = StringValidatorStrategy.equals('substr');
        let expected = validatorFunction('substr');
        expect(expected).toEqual(null);
    })

    it('should test equals validator method for invalid input', () => {
        let validatorFunction  = StringValidatorStrategy.equals('substr');
        let expected = validatorFunction('inputstr_sub_str');
        expect(expected).toEqual('Does not equal ' + 'substr');
    })

    it('should test isAfter validator method for valid input', () => {
        let validatorFunction  = StringValidatorStrategy.isAfter('2019-01-01');
        let expected = validatorFunction('2019-10-10');
        expect(expected).toEqual(null);
    })

    it('should test isAfter validator method for invalid input', () => {
        let validatorFunction  = StringValidatorStrategy.isAfter('2019-01-01');
        let expected = validatorFunction('2018-01-01');
        expect(expected).toEqual('2018-01-01' + ' is not after ' + '2019-01-01');
    })

    it('should test isAlpha validator method for valid input', () => {
        let expected  = StringValidatorStrategy.isAlpha('abcdABCD');
        expect(expected).toEqual(null);
    })

    it('should test isAlpha validator method for invalid input', () => {
        let expected  = StringValidatorStrategy.isAlpha('abcdABCD01');
        expect(expected).toEqual('abcdABCD01' + ' is not alpha');
    })

    it('should test isAlphanumeric validator method for valid input', () => {
        let expected  = StringValidatorStrategy.isAlphanumeric('abcdABCD01');
        expect(expected).toEqual(null);
    })

    it('should test isAlphanumeric validator method for invalid input', () => {
        let expected  = StringValidatorStrategy.isAlphanumeric('abcdABCD-01');
        expect(expected).toEqual('abcdABCD-01' + ' is not alphanumeric');
    })

    it('should test isAscii validator method for valid input', () => {
        let expected  = StringValidatorStrategy.isAscii('abcdABCD01');
        expect(expected).toEqual(null);
    })

    it('should test isAscii validator method for invalid input', () => {
        let expected  = StringValidatorStrategy.isAscii('मान्यकरण');
        expect(expected).toEqual('मान्यकरण' + ' is not ascii');
    })
});
