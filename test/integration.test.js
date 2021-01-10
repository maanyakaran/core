var Maanyakaran = require('maanyakaran');

describe('Maanyakaran as a package', () => {
    it('should be called as package', () => {
        Maanyakaran.addValidationStrategy(Maanyakaran.Strategies.Number)
        Maanyakaran.addValidationStrategy(Maanyakaran.Strategies.Form)
        const constraints = {
            person: {
                name: "Form:nonEmptyString",
                email: "Form:nonEmptyString, Form:validEmail",
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
})