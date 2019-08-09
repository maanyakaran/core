const Validator = require('../index')

describe('Validator Object tests', () => {

    it('should check validations for nested objects', () => {
        const constraints = {
            person: {
                name: "nonEmptyString",
                email: "nonEmptyString, validEmail"
            }
        }

        const validator = new Validator(constraints);

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
        Validator.addValidationRule('greaterThanFive', (subject) => {
            if (subject > 5) {
                return null
            }
            return "Number should be greater than five"
        })

        const constraints = {
            age: "greaterThanFive"
        }

        let validator = new Validator(constraints)
        expect(validator.validate({age: 7})).toBe(null)
        expect(validator.validate({age: 4})).toEqual({age: ['Number should be greater than five']})

    })

    it('should initialise validator with validation rules and then validate correct input as null', () => {

        const constraints = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Validator(constraints)

        expect(validator.validate({name: "gourav", email: "mail@gourav.info"})).toBe(null)

    })

    it('Should give error when invalid data is passed', () => {

        const constraints = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Validator(constraints)

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

        const validator = new Validator(constraints)

        expect(validator.validate({anotherName: ""})).toEqual({anotherName: ["Empty String"]})


    })

    it('should check validations for array based nested objects', () => {
        const constraints = {
            person: {
                children: [
                    {
                        name: "nonEmptyString",
                        age: "positiveInteger"
                    }
                ]
            }
        };

        const validator = new Validator(constraints);
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
        debugger
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
})



