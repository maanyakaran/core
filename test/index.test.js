const Maanyakaran = require('../index');
const StringStrategy = require( "../strategies/FormStrategy");
const NumberStrategy = require('../strategies/NumberStrategy');


describe('Validator Object tests', () => {
    Maanyakaran.addValidationStrategy(NumberStrategy)
    Maanyakaran.addValidationRule('nonEmptyString', StringStrategy.nonEmptyString);
    it('should implement strategy for package based validation rules', () => {

        Maanyakaran.addValidationRule('validEmail', StringStrategy.validEmail);
        const constraints = {
            person: {
                name: "nonEmptyString",
                email: "nonEmptyString, validEmail",
                age: "Number:lessThan100"
            }
        }

        const validator = new Maanyakaran(constraints);

        expect(validator.validate({
            person:
                {
                    name: "peter",
                    email: "",
                    age: 101
                }
        })).toEqual({
            person: {
                email: ["Empty String", "Invalid email"],
                age: ["less than 100"]
            }
        })
    })

    it('should implement closure based validation rules with params for namespace', () => {
        Maanyakaran.addValidationStrategy(NumberStrategy)
        Maanyakaran.addValidationRule('lessThan', NumberStrategy.lessThan)
        const constraints = {
            person: {
                age: "lessThan-100"
            }
        }

        const validator = new Maanyakaran(constraints);

        expect(validator.validate({
            person:
                {
                    age: 101
                }
        })).toEqual({
            person: {
                age: ["less than 100"]
            }
        })

    })

    it('should throw exception if given validation function is not defined', () => {
        const constraints = {
            person: {
                age: "notFound-110"
            }
        }
        const validator = new Maanyakaran(constraints);

        expect(() => {
            validator.validate({
                person:
                    {
                        age: 119
                    }
            })
        }).toThrow()
    })

    it('should throw exception if given validation function is not defined in namespace', () => {
        Maanyakaran.addValidationStrategy(NumberStrategy)
        const constraints = {
            person: {
                age: "NumberStrategy:Found-110"
            }
        }
        const validator = new Maanyakaran(constraints);

        expect(() => {
            validator.validate({
                person:
                    {
                        age: 119
                    }
            })
        }).toThrow()
    })

    it('should check validations for nested objects', () => {
        const constraints = {
            person: {
                name: "nonEmptyString",
                email: "nonEmptyString, validEmail"
            }
        }

        const validator = new Maanyakaran(constraints);

        expect(validator.validate({
            person:
                {
                    name: "gourav",
                    email: ""
                }
        })).toEqual({
            person: {
                email: ["Empty String", "Invalid email"]
            }
        })
    })


    it('should get new validation functions by validation strategy', () => {
        Maanyakaran.addValidationRule('greaterThanFive', (subject) => {
            if (subject > 5) {
                return null
            }
            return "Number should be greater than five"
        })

        const constraints = {
            age: "greaterThanFive"
        }

        let validator = new Maanyakaran(constraints)
        expect(validator.validate({age: 7})).toBe(null)
        expect(validator.validate({age: 4})).toEqual({age: ['Number should be greater than five']})

    })

    it('should initialise validator with validation rules and then validate correct input as null', () => {

        const constraints = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Maanyakaran(constraints)

        expect(validator.validate({name: "gourav", email: "mail@gourav.info"})).toBe(null)

    })

    it('Should give error when invalid data is passed', () => {

        const constraints = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Maanyakaran(constraints)

        expect(validator.validate({name: "", email: "mail"})).toEqual({
            name: ["Empty String"],
            email: ["Invalid email"]
        })
        expect(validator.validate({name: "", email: ""})).toEqual({
            name: ["Empty String"],
            email: ["Empty String", "Invalid email"]
        })

    })

    it('Should return error for the same key as of subject', () => {

        const constraints = {
            anotherName: "nonEmptyString"
        }

        const validator = new Maanyakaran(constraints)

        expect(validator.validate({anotherName: ""})).toEqual({anotherName: ["Empty String"]})


    })


    it('should check validations for array based nested objects', () => {
        const constraints = {
            person: {
                children: [
                    {
                        name: "nonEmptyString",
                        age: "Number:positiveInteger"
                    }
                ]
            }
        };

        const validator = new Maanyakaran(constraints);

        let expected = validator.validate({
            person:
                {
                    children: [
                        {
                            name: "peter",
                            age: -1
                        },
                        {
                            name: "",
                            age: 5
                        }
                    ]
                }
        })
        expect(expected).toEqual(
            {
                person: {
                    children: {
                        0: {
                            age: ["non positive integer"]
                        },
                        1: {
                            name: ["Empty String"]
                        }
                    }
                }
            }
        )

    })

    it("Should return true when isValid is invoked on object having no errors", () => {
        const constraints = {
            person: {
                children: [
                    {
                        name: "nonEmptyString",
                        age: "Number:positiveInteger"
                    }
                ]
            }
        };

        const validator = new Maanyakaran(constraints);

        let outcome = validator.validate({
            person:
                {
                    children: [
                        {
                            name: "peter",
                            age: 1
                        }
                    ]
                }
        })
        expect(outcome.isValid()).toBe(true);
        expect(outcome).toEqual({person: {children: {"0": null}}});
    })

    it("Should return false when isValid is invoked on object having errors", () => {
        const constraints = {
            person: {
                children: [
                    {
                        name: "nonEmptyString",
                        age: "Number:positiveInteger",
                        emails: ["validEmail"]
                    }
                ]
            }
        };

        const validator = new Maanyakaran(constraints);

        let outcome = validator.validate({
            person:
                {
                    children: [
                        {
                            name: "peter",
                            age: -1
                        }
                    ]
                }
        })
        expect(outcome.isValid()).toBe(false);
        expect(outcome).toEqual({person: {children: {"0": { age: ["non positive integer"],emails: {}}}}});
    })

})



