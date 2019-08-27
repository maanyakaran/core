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

const Maanyakaran = function (constraints) {

    function getRuleFunction(ruleString) {

        function getFunctionFromString(ruleFunctionString, nameSpace) {
            function getBaseFunction(functionName) {
                if (nameSpace) {
                    if(nameSpace[functionName]){
                        return nameSpace[functionName];
                    }
                    throw new Error("Invalid Function in Namespace")
                }
                if(ruleFunctions[functionName]){
                    return ruleFunctions[functionName];
                }
                throw new Error("Invalid Function")
            }

            let closureArg = ruleFunctionString.split('-');
            if (closureArg.length > 1) {
                return getBaseFunction(closureArg[0])(closureArg[1])
            }
            return getBaseFunction(ruleFunctionString)
        }


        let strategyValues = ruleString.split(':').map(str=>str.trim());

        //return rule function from name space
        if (strategyValues.length > 1) {
            let nameSpace = strategyMap[strategyValues[0]]
            return getFunctionFromString(strategyValues[1], nameSpace)
        }
        return getFunctionFromString(strategyValues[0])
    }

    function getRuleFunctionsList(constraintsString) {
        let ruleStrings = constraintsString.split(',').map(str=>str.trim())
        return ruleStrings.map(getRuleFunction)
    }


    this.validate = function (input) {
        let output = {};

        function handleArrayInRule(key) {
            output[key] = {};
            for (let inputArrayIdx in input[key]) {
                output[key][inputArrayIdx] = new Maanyakaran(constraints[key][0]).validate(input[key][inputArrayIdx]);
            }
        }


        for (let key in constraints) {
            if (typeof constraints[key] === "string") {
                output[key] = [];
                let applicableRuleFunctions = getRuleFunctionsList(constraints[key])
                for(let applicableRuleFunction of applicableRuleFunctions){
                    let error = applicableRuleFunction(input[key]);
                    error && output[key].push(error);
                }
                continue;
            }
            if (Array.isArray(constraints[key])) {
                handleArrayInRule(key);
                continue;
            }
            if (Object.keys(constraints[key]).length > 0) {
                output[key] = new Maanyakaran(constraints[key]).validate(input[key]);
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

Maanyakaran.addValidationRule = function (ruleName, ruleFunction) {
    ruleFunctions[ruleName] = ruleFunction;
}

Maanyakaran.addValidationStrategy = function (strategy) {
    strategyMap[strategy.name] = strategy;
}

module.exports = Maanyakaran;
