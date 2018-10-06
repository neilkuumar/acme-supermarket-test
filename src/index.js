import Basket from './Basket.js';
import Product from './Product.js';
import pricingRules from '../data/pricingRules.json';

// create new products
const strawberry = new Product('SR1');
const fruitTea = new Product('FR1');
const coffee = new Product('CF1');

// create basket with pricing rules
const basket = new Basket(pricingRules);

// add products to basket
basket.add(fruitTea);
basket.add(fruitTea);
basket.add(coffee);
basket.add(strawberry);

// items in basket
console.log(
	Object.keys(basket.products)
		.map(id => basket.products[id])
		.map(prod => prod.desc)
);

// total
console.log(basket.total());
