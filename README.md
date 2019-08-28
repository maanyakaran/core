# Maanyakaran ![alt text](https://travis-ci.org/ashwinijalkote/maanyakaran.svg?branch=master)



 Maanyakarn ([मान्यकरण](https://translate.google.co.in/#view=home&op=translate&sl=hi&tl=en&text=maanyakaran
)) is a hindi word which means validation, which is the basic offering of this micro framework. 
Maanyakarn provides easy and extensible way of performing validations over JS objects (primarily states of react, redux 
and similar frameworks).

### Installation

Install the library
```bash
 npm install maanyakaran
```

### Usage Guide

##### Without ES6
```javascript
var Maanyakaran = require('maanyakaran');
```

##### ES6
```javascript
import Maanyakaran from 'maanyakaran';
```

##### Concepts

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
     Instance of Maanyakaran object invokes validate method with input as an argument and validates input against 
     given constraints.
     ```javascript
     validator.validate({anotherName: "maanyakaran"})
     ```
     
  3. validate()<br/>
     validate method of Maanyakaran object returns object with keys as per input object and value as an array of error 
     message(s) if the value for the corresponding key is invalid as per the constraints.   
     ```javascript
     const constraints = {
         person: {
             name: "nonEmptyString",
             email: "nonEmptyString, validEmail"
         }
     }
     const validator = new Maanyakaran(constraints);
     validator.validate({
        person: {
           name: "gourav",
           email: ""
        }
     })     
     ```
     #####Output
     ```javascript
     person: {
        email: ["Empty String", "Invalid email"]
     }
     ```
     
  
  4. Types of values in constraint<br/>
     i. string:<br/>
        String could be comma separated strings or just one string.<br/>
        Each string could be in the form : <br/>
        &lt;Namespace:&gt;&lt;validationFunctionName&gt;<br/>
        or <br/>
        &lt;Namespace:&gt;&lt;validationFunctionName-&gt;&lt;closureArgument&gt;<br/>
        where Namespace is optional, which refers to the name of the library of validators.<br/>
        validationFunction is required and it is the function name which is used to validate input.
        
        eg:
        ```javascript
           const constraints = 
             {
                 person: {
                     age: "NumberStrategy:lessThan-100",//closure function with 100 as argument
                     name: "nonEmptyString",
                     email: "nonEmptyString, validEmail",
                     count: "NumberStrategy:lessThan100"
                 }
             }
        ```
          
     ii. Object: <br/>
         value can itself be an object to validate for nested object structure in the input.
     
     iii. Array object: <br/>
          value can also be an array to indicate that the corresponding key can occur multiple times and should be 
          validated as per the containing constraint object in the array. 
          
        eg:
        ```javascript
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
        ```         
                      
### Out of box validation

  Maanyakaran comes up with a few built-in validator functions:<br/>
    
    | Validator       |                     Description                            |
    |-----------------|------------------------------------------------------------|
    | nonEmptyString  |     checks if the subject string has a length of zero.     |
    | validEmail      |          checks if the subject string is an email.         |
    | positiveInteger | checks if the subject integer is a positive integer.       |

### Out of box Strategies 

   Maanyakaran comes up with a built-in NumberStrategy to validate numbers. It includes following validator functions:<br/>
     
    | Validator       | Description                                                                                |
    |-----------------|--------------------------------------------------------------------------------------------|
    | positiveInteger | checks if the subject integer is a positive integer.                                       |
    | lessThan100     | checks if the subject integer is less than 100.                                            |
    | lessThan        | closure function which takes an argument say k and checks if subject input is less than k. |
    

### Creating Custom Strategy and Extension
   Maanyakaran lets you easily create your own validators that fits your needs.
   You can register them using addValidationStrategy or addValidationRule.
    
   1. addValidationStrategy<br/>
       It lets you add a library of validators.
       
       ```javascript
       Maanyakaran.addValidationStrategy(NumberStrategy)
       const constraints = {
          person: {
              age: "NumberStrategy:Found-110"
          }
       }
       ```    
       Refer to [NumberStrategy](./lib/NumberStrategy.js) to implement your own strategy.
       
   2. addValidationRule <br/>
       It lets you add a custom validator function.
       
       ```javascript
       Maanyakaran.addValidationRule('greaterThanFive', (subject) => {
           if (subject > 5) {
               return null
           }
           return "Number should be greater than five"
       })
       ```            

### Tests
Tests are run using jest, to run the tests use:
```bash
npm test
```

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


