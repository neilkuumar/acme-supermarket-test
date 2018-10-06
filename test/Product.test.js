import Product from '../src/Product.js';

describe('Product', () => {
	describe('new Product()', () => {
		it('creates a new product based on product id', () => {
			const strawberry = new Product('SR1');
			expect(strawberry).toEqual({ desc: 'Strawberries', id: 'SR1', price: 5 });
		});

		it('throws an error for an invalid product id', () => {
			expect(() => new Product('abc123')).toThrowError(/Id not recognised./);
		});
	});
});
