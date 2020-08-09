const userName = 'Bob';

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


const NowAdd = (...numbers: number[]) => {
  return numbers.reduce((curRes, curVal) => {
    return curRes + curVal
  }, 0)
}

const hobbies = ['Sports', 'Cooking', 'eating', 'beating'];

const addedNumber = NowAdd(5, 4, 3, 2, 1);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

const { firstName: theName, age } = person;

const thenAdd = ([...numbers]: number[]) =>{
  return numbers.reduce((current, total) => {
    return current + total;
  })
}