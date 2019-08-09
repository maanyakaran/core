const Validator = require('../index')

describe('Validator Object tests', () => {

    it('should get new validation functions by validation strategy', () => {
        Validator.addValidationRule('greaterThanFive', (subject) => {
            if (subject > 5) {
                return null
            }
            return "Number should be greater than five"
        })

        const rules = {
            age: "greaterThanFive"
        }

        let validator = new Validator(rules)
        expect(validator.validate({age: 7})).toBe(null)
        expect(validator.validate({age: 4})).toEqual({age: ['Number should be greater than five']})

    })

    it('should initialise validator with validation rules and then validate correct input as null', () => {

        const rules = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Validator(rules)

        expect(validator.validate({name: "gourav", email: "mail@gourav.info"})).toBe(null)

    })

    it('Should give error when invalid data is passed', () => {

        const rules = {
            name: "nonEmptyString",
            email: "nonEmptyString, validEmail"
        }

        const validator = new Validator(rules)

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

        const rules = {
            anotherName: "nonEmptyString"
        }

        const validator = new Validator(rules)

        expect(validator.validate({anotherName: ""})).toEqual({anotherName: ["Empty String"]})


    })

})


