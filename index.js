const ruleFunctions = {
    nonEmptyString: function (subject) {
        return subject.length === 0 ? 'Empty String' : null;
    },
    validEmail: function (subject) {
        validateEmail = function validateEmail(email) {
            let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
            return re.test(email);
        }
        return !validateEmail(subject) ? 'Invalid email' : null;
    },
    positiveInteger: function (subject) {
        return Number.isInteger(subject) && subject > 0 ? null : 'non positive integer';
    }
};

const strategyMap = {};

const Validator = function (constraints) {

    this.getStrategyValuesIfExists = function(constraintValue) {
        let strategyValues = constraintValue.split(':');
        return strategyValues.length > 1 ? strategyValues : null;
    }


    this.validate = function (input) {
        let output = {};
        for (let key in constraints) {
            if (typeof constraints[key] === "string") {
                output[key] = [];
                let strategyValues = this.getStrategyValuesIfExists(constraints[key]);
                if (strategyValues) {
                    let closureArg = strategyValues[1].split('-');
                    if (closureArg.length > 1) {
                        let closureFunct = strategyMap[strategyValues[0]][closureArg[0]](closureArg[1]);
                        let error = closureFunct(input[key]);
                        error && output[key].push(error);
                        continue;
                    }
                    let error = strategyMap[strategyValues[0]][strategyValues[1]](input[key]);
                    error && output[key].push(error);
                    continue;
                }
                for (validationRule of constraints[key].split(',')) {
                    if (ruleFunctions[validationRule.trim()]) {
                        let error = ruleFunctions[validationRule.trim()](input[key]);
                        error && output[key].push(error);
                    } else {
                        throw new Error(validationRule.trim() + ' does not exist');
                    }
                }
                continue;
            }
            if (Array.isArray(constraints[key])) {
                output[key] = {};
                for (let inputArrayIdx in input[key]) {
                    output[key][inputArrayIdx] = new Validator(constraints[key][0]).validate(input[key][inputArrayIdx]);
                }
                continue;
            }
            if (Object.keys(constraints[key]).length > 0) {
                output[key] = new Validator(constraints[key]).validate(input[key]);
                continue;
            }

        }
        for (key in output) {

            if (output[key] === null || output[key].length === 0) {
                delete output[key];
            }

        }
        return Object.keys(output).length === 0 ? null : output;
    }

}

Validator.addValidationRule = function (ruleName, ruleFunction) {
    ruleFunctions[ruleName] = ruleFunction;
}

Validator.addValidationStrategy = function(strategy) {
    strategyMap[strategy.name] = strategy;
}

module.exports = Validator;
