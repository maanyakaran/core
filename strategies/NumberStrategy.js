function NumberStrategy() {
    this.name = "Number";

    this.positiveInteger = (subject) => {
        return Number.isInteger(subject) && subject > 0 ? null : 'non positive integer';
    }

    this.lessThan100 = (subject) => {
        return subject < 100 ? null : 'less than 100';
    }

    this.lessThan = (k) => (subject) => {
        return subject < parseInt(k) ? null : 'less than ' + k;
    }

}

module.exports = new NumberStrategy()