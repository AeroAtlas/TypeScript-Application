const userName = 'Bob';
console.log(userName);
////const button = document.querySelector('button')!;

function subtract(n1: number, n2: number): number | void {
  if (n1 - n2 > 0) {
    return n1 - n2
  }
  return;
}

const person = {
  firstName: 'Max',
  age: 30
};

const notCopiedPerson = person //copies the pointer to the person object (middleman)
const copiedPerson = { ...person }; // creates new object identical to person


const add = (...numbers: number[]) => {
  return numbers.reduce((curRes, curVal) => {
    return curRes + curVal
  }, 0)
}

const hobbies = ['Sports', 'Cooking', 'eating', 'beating'];

const addedNumber = add(5, 4, 3, 2, 1);
console.log(addedNumber);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

const { firstName: theName, age } = person;
// the variable must be an existing name but can rename with :

// const add = (a: number, b: number) => a + b //default arg
// const sub = (a: number, b: number = 1) => a - b //default arg


// const activeHobbies = ['Hiking', ...hobbies];

// activeHobbies.push(...hobbies)

// const clickHandler = (message: string) => console.log('Clicked! ' + message);

// const printOutput: (a: number | string) => void = output => console.log(output);

// printOutput(sub(5))


// const button = document.querySelector('button');
// if (button) {
//   button.addEventListener('click', event => console.log(event))
// }


// if (button) {
//   button.addEventListener('click', clickHandler.bind(null, 'You\'re welcome'))
// }




// let userInput: unknown;
// let userName: string | number;


// userInput = 5;
// userInput = "bob";
// if (typeof userInput === 'string') {
//   userName = userInput;
// }

// // function generateError(message: string, code: number): never {
// //   throw { message: message, errorCode: code };
// //   //while(true) {} 
// // }

// // generateError('An error occured!', 500)

// type NumStr = number | string;
// type Convert = 'as-number' | 'as-text'

// function combine(
//   input1: NumStr,
//   input2: NumStr,
//   resultType: Convert){
//   let result;
//   if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number'){
//     result = +input1 + +input2;
//   }
//     result = input1.toString() + input2.toString()
//   if (resultType === 'as-number') {
//     return +(result)
//   } else {
//     return result.toString
//   }
// };

// type Product = { title: string; price: number; };
// const p1: Product = { title: 'Abook', price: 12.99 }

// type User = { name: string } | string;
// let u1: User = { name: 'Max' };
// u1 = 'Michael'

// const combinedStringAges = combine('30', '26', 'as-number');
// const combinedAges = combine(30, 26, "as-number");
// const combinedNames = combine('Max', 'Anna', "as-text");