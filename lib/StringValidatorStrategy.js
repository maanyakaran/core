const StringValidator = require('validator');

function StringStrategy() {
    this.name = "StringValidatorStrategy";

    this.contains = (seed) => (subject) => {
        return StringValidator.contains(subject, seed) ? null : 'Does not contain ' + seed;
    }

    this.equals = (comparison) => (subject) => {
        return StringValidator.equals(subject, comparison) ? null : 'Does not equal ' + comparison;
    }

    this.isAfter = (date) => (subject) => {
        return StringValidator.isAfter(subject, date) ? null: subject + ' is not after ' + date;
    }

    this.isAlpha = (subject) => {
        return StringValidator.isAlpha(subject) ? null:  subject + ' is not alpha';
    }

    this.isAlphanumeric = (subject) =>  {
        return StringValidator.isAlphanumeric(subject) ? null : subject + ' is not alphanumeric';
    }

    this.isAscii = (subject) => {
        return StringValidator.isAscii(subject) ? null : subject + ' is not ascii';
    }

    this.isBase32 = (subject) => {
        return StringValidator.isBase32(subject) ? null : subject + ' is not base32';
    }

    this.isBase64 = (subject) => {
        return StringValidator.isBase64(subject) ? null : subject + ' is not base64';
    }

    this.isBefore = (date) => (subject) => {
        return StringValidator.isBefore(subject, date) ? null : subject + ' is not before' + date;
    }

    this.isBoolean = (subject) => {
        return StringValidator.isBoolean(subject) ? null : subject + ' is not boolean';
    }

    this.isBIC = (subject) => {
        return StringValidator.isBIC(subject) ? null : subject + ' is not BIC(Bank Idenfication Code) or SWIFT code.';
    }

    this.isCreditCard = (subject) => {
        return StringValidator.isCreditCard(subject) ? null : subject + ' is not a Credit Card';
    }

}

module.exports = new StringStrategy()