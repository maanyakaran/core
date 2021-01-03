const ruleFunctions = {};
const strategyMap = {};

const Maanyakaran = function (constraints) {

    function ValidationResults() {}
    ValidationResults.prototype.valid = true;
    ValidationResults.prototype.isValid = function () {
        return this.flags.valid
    }

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
                throw new Error(`Validation rule function name '${functionName}' is not defined. Initialise rule function using Maanyakarn.addValidationRule()`)
            }

            let closureArg = ruleFunctionString.split('-');
            if (closureArg.length > 1) {
                return getBaseFunction(closureArg[0])(closureArg[1])
            }
            return getBaseFunction(ruleFunctionString)
        }


        let strategyValues = ruleString.split(':').map(str => str.trim());

        //return rule function from name space
        if (strategyValues.length > 1) {
            let nameSpace = strategyMap[strategyValues[0]]
            return getFunctionFromString(strategyValues[1], nameSpace)
        }
        return getFunctionFromString(strategyValues[0])
    }

    function getRuleFunctionsList(constraintsString) {
        let ruleStrings = constraintsString.split(',').map(str => str.trim())
        return ruleStrings.map(getRuleFunction)
    }

    this.validate = function (input, flags = {valid:true}) {
        let output = new ValidationResults();
        function handleArrayInRule(key) {
            output[key] = new ValidationResults();
            for (let inputArrayIdx in input[key]) {
                output[key][inputArrayIdx] = new Maanyakaran(constraints[key][0]).validate(input[key][inputArrayIdx], flags);
            }
        }


        for (let key in constraints) {
            if (typeof constraints[key] === "string") {
                output[key] = [];
                let applicableRuleFunctions = getRuleFunctionsList(constraints[key])
                for(let applicableRuleFunction of applicableRuleFunctions){
                    let error = applicableRuleFunction(input[key]);
                    if(error && flags){
                        flags.valid = false;
                    }
                    error && output[key].push(error);
                }
                continue;
            }
            if (Array.isArray(constraints[key])) {
                handleArrayInRule(key);
                continue;
            }
            if (Object.keys(constraints[key]).length > 0) {
                output[key] = new Maanyakaran(constraints[key]).validate(input[key],flags);
                continue;
            }

        }
        for (key in output) {

            if (output[key] === null || output[key].length === 0) {
                delete output[key];
            }

        }
        output.__proto__.flags = flags
        return Object.keys(output).length === 0 ? null : output;
    }

}

Maanyakaran.addValidationRule = function (ruleName, ruleFunction) {
    ruleFunctions[ruleName] = ruleFunction;
}

Maanyakaran.addValidationStrategy = function (strategy) {
    strategyMap[strategy.name] = strategy;
}

Maanyakaran.getAll = function(){
    return JSON.stringify({"functions":Object.keys(ruleFunctions), 'strategies':Object.keys(strategyMap)});
}

module.exports = Maanyakaran;
