import products from '../data/products.json';

/** Class for a product */
export default class Product {
	/**
	 * Create a new product.
	 * @param  {String} productId id of product ('FR1')
	 */
	constructor(productId) {
		if (!products[productId]) throw new Error('Product Id not recognised.');
		return products[productId];
	}
}
