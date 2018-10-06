import Basket from '../src/Basket.js';
import Product from '../src/Product.js';
import pricingRules from '../data/pricingRules.json';

let basket;
const strawberry = new Product('SR1');
const fruitTea = new Product('FR1');
const coffee = new Product('CF1');

describe('Basket', () => {
	// -- Test creating a new basket. --
	describe('new Basket()', () => {
		it('creates a new basket with no pricing rules', () => {
			const basket = new Basket();
			expect(basket).toEqual({ currency: '£', pricingRules: [], products: {} });
		});

		it('creates a new basket with pricing rules', () => {
			const basket = new Basket(pricingRules);
			expect(basket.pricingRules).toEqual([
				{ productId: 'FR1', promotion: 'bogof' },
				{ productId: 'SR1', promotion: '3for4-50' }
			]);
		});

		it('creates a ignores pricing rules without any logic', () => {
			const basket = new Basket([...pricingRules, { productId: 'SR1', promotion: 'fakePromotion' }]);
			expect(basket.total()).toEqual('£0');
		});
	});

	// -- Test calculating the total --
	describe('total()', () => {
		beforeEach(() => {
			// create a new basket before every test.
			basket = new Basket(pricingRules);
		});

		it('adds FR1, SR1, FR1, CF1 to get £19.34', () => {
			const productsInBasket = [fruitTea, strawberry, fruitTea, coffee];
			productsInBasket.forEach(product => basket.add(product));
			expect(basket.total()).toEqual('£19.34');
		});

		it('adds FR1, FR1 to get £3.11', () => {
			const productsInBasket = [fruitTea, fruitTea];
			productsInBasket.forEach(product => basket.add(product));
			expect(basket.total()).toEqual('£3.11');
		});

		it('adds SR1, SR1, FR1, SR1 to get £16.61', () => {
			const productsInBasket = [strawberry, strawberry, fruitTea, strawberry];
			productsInBasket.forEach(product => basket.add(product));
			expect(basket.total()).toEqual('£16.61');
		});
	});

	// -- Test adding new products to the basket --
	describe('add()', () => {
		beforeEach(() => {
			// create a new basket before every test.
			basket = new Basket();
		});

		it('adds a new product with qty of 1', () => {
			basket.add(strawberry);
			expect(basket.products['SR1']).toEqual({ ...strawberry, qty: 1 });
		});

		it('adds 2 products with qty of 2', () => {
			basket.add(fruitTea);
			basket.add(fruitTea);
			expect(basket.products['FR1']).toEqual({ ...fruitTea, qty: 2 });
		});

		it('adds 3 products with seperate qtys', () => {
			const productsInBasket = [strawberry, fruitTea, coffee];
			productsInBasket.forEach(product => basket.add(product));
			productsInBasket.forEach(product => {
				expect(basket.products[product.id]).toEqual({ ...product, qty: 1 });
			});
		});
	});
});
