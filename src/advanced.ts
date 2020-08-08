type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//interface ElevatedEmployee2 extends Employee, Admin {} ...if you use interfaces

//Intersection Types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Bob",
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

//Function overload (add different combos so typescript can infer output)
// function addIt(n: number): number can change parameters if you make optionals
function addIt(a: number, b: number): number;
function addIt(a: string, b: string): string;
function addIt(a: number, b: string): string;
function addIt(a: string, b: number): string;
function addIt(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { //type guard
    return a.toString() + b.toString()
  } else {
    return +a + +b;
  }
}


const result = addIt("1", 5) as string;//using typecasting
result.split(' ');

interface userData {
  id: string;
  name: string;
  job: {title: string, description: string};
}

const fetchedUserData : userData = {
  id: 'u1',
  name: 'Max',
  job: {title: 'CEO', description: 'My own compnay'}
}

console.log(fetchedUserData?.job?.title) //option chaining
//console.log(fetchedUserData.job && fetchedUserData.job.title) //Javascript way

//Nullish Coalescing ie ?? only checks for null or undefined
const userInput = null;
const storedData = userInput ?? 'Default';
console.log(storedData)




// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log('Name: ' + emp.name)
//   if ('privileges' in emp) { //check if property exists in employee
//     console.log('Privileges: ' + emp.privileges)
//   }
//   if ('startDate' in emp) { //check if property exists in employee
//     console.log('Start Date: ' + emp.startDate)
//   }
// }

// printEmployeeInformation(e1);
// printEmployeeInformation({ name: 'Bill', startDate: new Date() });

// class Car {
//   drive() {
//     console.log('Driving...')
//   }
// }

// class Truck{
//   drive() {
//     console.log('Driving a truck');
//   }
//   loadCargo(amount: number) {
//     console.log('Loading cargo...' + amount)
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car()
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);


// //Discriminated Union (the type property)
// interface Bird {
//   type: 'bird'; //literal type assignment
//   flyingSpeed: number;
// }
// interface Horse {
//   type: 'horse'; //literal type assignment
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log('Moving with speed: ' + speed)
// }

// moveAnimal({ type: 'bird', flyingSpeed: 10 });

// //const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement; //better with react

// /* Alt more manual way of doing it
// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value = "Hi there!"
// }
// */
// //userInputElement.value = "Hi there!";

// interface ErrorContainer { //{email: 'Not valid email, username: 'Must start with char}
//   [prop: string]: string; //lets you create as many properties as needed
// };

// const ErrorBag: ErrorContainer = {
//   email: 'Not a valid email',
//   username: 'Must start with a capital character!'
// };