# Maanyakaran ![alt text](https://travis-ci.org/ashwinijalkote/maanyakaran.svg?branch=master)



 Maanyakarn ([मान्यकरण](https://translate.google.co.in/#view=home&op=translate&sl=hi&tl=en&text=maanyakaran
)) is a hindi word which means validation, which is the basic offering of this micro framework. 
Maanyakarn provide easy and extensible way for performing validations over JS objects (primarily states of react, redux and similar frameworks).

###Installation

Install the library
```bash
 npm install maanyakaran
```

### Usage Guide

#####Concepts

  1. Constraints:<br/>
     Maanyakaran class takes constraints object as an argument to its constructor which contains key value pairs, where 
     value defines rules for the key.
     ```javascript
        const constraints = {
             anotherName: "nonEmptyString"
        }
        const validator = new Maanyakaran(constraints)
     ```

  2. Input:<br/>
     Instance of Maanyakaran object invokes validate method with input as an argument and validates the input against 
     the constraints.
     ```javascript
         validator.validate({anotherName: "maanyakaran"})
     ```
     
  3. Validator method<br/>
     Validator method returns error message if the value for the corresponding key is invalid as per the constraint.        
  
  4. Types of values in constraint<br/>
     i. string:<br/>
        String could be comma separated strings or just one string.
        Each string could be in the form : 
        <Namespace:><validationFunctionName> or 
        <Namespace:><validationFunctionName-><closureArgument>
        where Namespace is optional.
          
     ii. Object: <br/>
         value can itself be an object to validate for nested object structure in the input.
     
     iii. Array object: <br/>
          value can also be an array to indicate that the corresponding key can occur multiple times and should be 
          validated as per the containing constraint object in the array. 
           
          eg
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
                      

#####Without ES6
```javascript
var Maanyakaran = require('maanyakaran');
```

#####ES6
```javascript
import Maanyakaran from 'maanyakaram';
```


### Creating Custom Strategy and Extension

### Out of the box validation

### Out of box Strategies 

### Tests
Tests are run using jest, to run the tests use:
```bash
npm test
```

### Credit

###License

###Keywords

### Writing and publishing ruleset

### License (MIT)
```
Copyright (c) 2019 Ashwini Jalkote <ashwinijalkote@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```


