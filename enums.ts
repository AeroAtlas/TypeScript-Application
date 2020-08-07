// const person: {
//   name: string;
//   age: number;
// } = {
  let favoriteActivities: string[]; //any or any[] work too
  favoriteActivities = ['sports', 'more sport'];

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; //tuple
// } = {
//   name: 'Bob',
//   age: 30,
//   hobbies: favoriteActivities,
//   role: [2, 'author']
// };
const 

enum Role {
  ADMIN, READ_ONLY, AUTHOR //0,1,2
};
enum Role2 {
  ADMIN=5, READ_ONLY, AUTHOR //5,6,7
};
enum Role3 {
  ADMIN=404, READ_ONLY=0, AUTHOR="Author" //404, 0, Author
};


const person = {
  name: 'Bob',
  age: 30,
  hobbies: favoriteActivities,
  role: Role.ADMIN
};

// person.role.push('admin'); //push will strill work
// person.role[1] = 10; //this won't work
//person.role = [0, 'admin', 'user'] //this won't work



console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
}

// if (person.role = role.author) {
//   console.log()
// }