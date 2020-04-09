export async function getProducts() {
	try {
		const products = await fetch('/data/Webdev_data2.json');
		return products.json();
	} catch (error) {
		console.error('Failed to fetch products', error);
	}
}
