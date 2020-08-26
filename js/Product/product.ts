import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 19.99 }
]

const newProd = new Product('', -5.99)
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log("Validation Errors" + errors)
  }
  console.log(newProd.getInformation());
});

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// const loadedProducts = products.map(prod => new Product(prod.title, prod.price))
// for (const prod of loadedProducts) {
//   console.log(prod.getInformation())
// }
