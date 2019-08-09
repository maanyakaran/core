const ruleFunctions = {};

const Validator = function(rules) {

    this.validate = function(input) {
        let output = {};
        for( key in rules) {
            output[key] = [];
            for (validationRule of rules[key].split(',')) {

                if (validationRule.trim() === 'nonEmptyString' && input[key].length === 0) {
                    output[key].push("Empty String");
                }
                if (validationRule.trim() === 'validEmail' && !this.validateEmail(input[key])) {
                    output[key].push("Invalid email");
                }
                if (ruleFunctions[validationRule.trim()]) {
                    let error = ruleFunctions[validationRule.trim()](input[key]);
                    error && output[key].push(error);
                }
            }

        }
        for(key in output) {
            if (output[key].length === 0) {
                delete  output[key];
            }

        }
        return Object.keys(output).length === 0 ? null : output ;

    }

    this.validateEmail = function validateEmail(email)
    {
        let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }
}

Validator.addValidationRule = function(ruleName, ruleFunction ) {
    ruleFunctions[ruleName] = ruleFunction;
}
module.exports = Validator;
