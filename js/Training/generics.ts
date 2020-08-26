// const names: Array<string> = ['Bill', 'Bob']; //generic type
// //names[0].split(' ')

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done')
//   }, 2000);
//     console.log(reject) 
// });

// //.then can be put outside the promise function
// promise.then(data => {
//   data.split(' ');
// })
//Creat own Generic Type
// function merge<T, U>(objA: T, objB: U) { //can add : T & U
//   return Object.assign(objA, objB);
// }
function merge<T extends object, U extends object>(objA: T, objB: U) { //can add : T & U
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Bob', hobbies: ['Fun'] }, { age: 20 });
const mergedObj2 = merge<{ name: string, hobbies: string[] },{ age: number }>({ name: 'Bill', hobbies: ['Fun'] }, { age: 30 });
//const mergedObj3 = merge({ name: 'Bob', hobbies: ['Fun'] }, 20); //20 fails silently if not contrained
console.log(mergedObj.age);

//Check for inherent length property in string, array, object, etc
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] { //returns tuple
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.'; 
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + 'elements.'; 
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Hi there', 'My dude']));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) : string {
  return 'Value: '+ obj[key];
}

extractAndConvert({name: 'Bob'}, 'name');

//incorrect alt private data: (string|number|boolean)[] = []

class DataStorage<T extends string|number|boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (item instanceof Object) {
      console.log("object")
    } else if (this.data.indexOf(item) === -1) {
      return; //no item found
    } else {
      this.data.splice(this.data.indexOf(item), 1)
    }
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Bob")
textStorage.addItem("Bill")
textStorage.addItem("Butch")
textStorage.removeItem('Bill')
const people = textStorage.getItems

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: 'Max' };
// objStorage.addItem({ name: 'Bob' })
// objStorage.addItem({ name: 'Bill' })
// objStorage.removeItem({ name: 'Bob' })


interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date
}


function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; //partial means it'll be a _ later
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
// {
//   return {title:title, description:description, completeUntil:date}
// }

const names: Readonly<string[]> = ['Max', 'Bob'];
//names.push('Bill'); readonly stops push and pop
//names.pop('Max)

 