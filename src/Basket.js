/** Class for shopping basket. */
export default class Basket {
	/**
	 * Create a basket with pricing rules.
	 * @param {Object} pricingRules rules for pricing
	 */
	constructor(pricingRules = []) {
		this.pricingRules = pricingRules;
		this.currency = '£';
		this.products = {};
	}

	/**
	 * Add a product to the basket.
	 * - group existing products by incrementing qty.
	 * @param  {Object} product { productId, productDesc, productPrice }
	 * @param  {Integer} qty quantity of product
	 */
	add(product, qty = 1) {
		const id = product.id;
		if (!this.products[id]) {
			this.products[id] = { ...product, qty };
		} else {
			const existingQty = this.products[id].qty;
			this.products[id].qty = existingQty + qty;
		}
	}

	/**
	 * Return the grand total price of the basket.
	 * @return {Integer} price of basket
	 */
	total() {
		return (
			this.currency +
			this._applyPromotions()
				.map(product => product.price * product.qty)
				.reduce((sumTotal, price) => sumTotal + price, 0)
		);
	}

	// Private Methods

	/**
	 * Apply promotions to basket.
	 * @return {Array} products in the basket after promotions have been applied.
	 */
	_applyPromotions() {
		this._applyRulesToProducts();
		return this._getProductsFromBasket();
	}

	/**
	 * Applies each rule to each product (if relevant).
	 */
	_applyRulesToProducts() {
		this.pricingRules.forEach(rule => this._applyRuleToProducts(rule));
	}

	/**
	 * Finds relevant products for the given rule and applies logic.
	 * @param  {Object} rule
	 */
	_applyRuleToProducts(rule) {
		this._getProductsFromBasket()
			.filter(product => product.id === rule.productId)
			.forEach(product => this._applyRuleToProduct(rule, product));
	}

	/**
	 * Apply a given rule to a given product.
	 * This makes it quite easy to add/change rule logic
	 * @param  {Object} rule
	 * @param  {Object} product
	 */
	_applyRuleToProduct(rule, product) {
		switch (rule.promotion) {
			case '3for4-50':
				if (product.qty >= 3) this.products[product.id] = { ...product, price: 4.5 };
				break;
			case 'bogof':
				this.products[product.id] = { ...product, qty: Math.ceil(product.qty / 2) };
				break;
			// ## add more promotions here ##
		}
	}

	/**
	 * Get products from basket.
	 * @return {Array} products
	 */
	_getProductsFromBasket() {
		return Object.keys(this.products).map(id => this.products[id]);
	}
}
